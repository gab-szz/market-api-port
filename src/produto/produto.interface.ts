export interface Produto {
  nome: string; // Nome do produto
  valor: number; // Valor do produto
  quantidadeDisponivel: number; // Quantidade disponível em estoque
  descricao: string; // Descrição do produto
  caracteristicas: { nome: string; descricao: string }[]; // Características do produto
  imagens: { url: string; descricao: string }[]; // Imagens do produto
  categoria: string; // Categoria do produto
  dataCriacao: Date; // Data de criação do produto
  dataAtualizacao: Date; // Data de atualização do produto
}
