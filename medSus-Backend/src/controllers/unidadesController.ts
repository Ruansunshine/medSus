import 'dotenv/config'
import { Request, Response } from 'express';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface GooglePlace {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export async function buscarUnidadesProximas(req: Request, res: Response): Promise<void> {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ error: 'Latitude e longitude são obrigatórias' });
    return;
  }

  console.log("Latitude:", lat, "Longitude:", lng);

  const types = [ 
    { type: 'hospital', keyword: '' },
    { type: 'health', keyword: 'posto de saúde' },
  ];

  const allResults: GooglePlace[] = [];

  try {
    for (const item of types) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=${item.type}&keyword=${item.keyword}&key=${GOOGLE_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log("dados da unidades encontradas " +  JSON.stringify(data, null, 2));
      if (data.results?.length > 0) {
        allResults.push(...data.results);
      }
    }

    // Remover duplicatas com base no place_id
    const locaisUnicos = Array.from(new Map(
      allResults.map(item => [item.place_id, {
        id: item.place_id,
        nome: item.name,
        endereco: item.vicinity,
        localizacao: item.geometry.location,
      }])
    ).values());

    console.log("Unidades encontradas:", locaisUnicos.length);

    res.status(200).json(locaisUnicos);
  } catch (error: any) {
    console.error("Erro na busca de unidades:", error);
    res.status(500).json({ error: error.message || 'Erro ao buscar unidades' });
  }
}
