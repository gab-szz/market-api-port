import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUsuarioDto } from './create-usuario.dto';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {
    console.log('UsuarioController');
  }

  @Post()
  async create(@Body() dto: CreateUsuarioDto) {
    this.usuarioRepository.saveUsuario(dto);
    return dto;
  }

  @Get()
  async getUsuario() {
    return this.usuarioRepository.getUsuario();
  }
}
