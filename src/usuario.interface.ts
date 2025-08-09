export interface Usuario {
  nome: string; // Nome do usuário
  email: string; // E-mail do usuário
  senha: string; // Senha (normalmente criptografada)
  perfil?: string; // Perfil ou função (opcional)
}
