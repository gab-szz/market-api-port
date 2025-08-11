import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { CreateProdutoDto } from '../produto/create-produto.dto';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {
    console.log('ProdutoController');
  }

  @Post()
  async create(@Body(new ValidationPipe()) createProdutoDto: CreateProdutoDto) {
    this.produtoRepository.saveProduto(createProdutoDto);
    return createProdutoDto;
  }

  @Get()
  async getProduto() {
    return this.produtoRepository.getProduto();
  }
}
