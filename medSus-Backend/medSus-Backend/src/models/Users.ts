// models/User.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  dateNascimento: string;
  phone: string;
  cartaoSus: string;
  estado: string;
  cidade: string;
  cep: string;
}
