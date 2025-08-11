import { Injectable } from '@nestjs/common';
import { Produto } from './produto.interface';

@Injectable()
export class ProdutoRepository {
  private produtos: Produto[] = [];

  async saveProduto(produto: Produto): Promise<Produto> {
    this.produtos.push(produto);
    console.log(`Produtos: ${JSON.stringify(this.produtos)}`);
    return produto;
  }

  async getProduto(): Promise<Produto[]> {
    return this.produtos;
  }
}
