import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  NotFoundException,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuidv4 } from 'uuid';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {
    console.log('UsuarioController');
  }

  @Post()
  async create(@Body() dto: CreateUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();

    usuarioEntity.id = uuidv4();
    usuarioEntity.nome = dto.nome;
    usuarioEntity.email = dto.email;
    usuarioEntity.senha = dto.senha;
    usuarioEntity.perfil = dto.perfil;
    usuarioEntity.dataCriacao = new Date();
    usuarioEntity.dataAtualizacao = new Date();

    this.usuarioRepository.saveUsuario(usuarioEntity);
    return {
      usuario: new ListUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso.',
    };
  }

  @Get()
  async getUsuarios() {
    const usuarios = await this.usuarioRepository.getUsuario();
    console.log(usuarios);
    return usuarios.map(
      (usuario) => new ListUsuarioDto(usuario.id, usuario.nome),
    );
  }

  @Put('/:id')
  async updateUsuario(
    @Param('id') id: string,
    @Body() novosDados: UpdateUsuarioDto,
  ) {
    const usuarioEntity = await this.usuarioRepository.getUsuarioById(id);
    if (!usuarioEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }

    usuarioEntity.nome = novosDados.nome;
    usuarioEntity.email = novosDados.email;
    usuarioEntity.senha = novosDados.senha;
    usuarioEntity.perfil = novosDados.perfil;
    usuarioEntity.dataAtualizacao = new Date();

    await this.usuarioRepository.updateUsuario(id, usuarioEntity);

    return {
      usuario: new ListUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async deleteUsuario(@Param('id') id: string) {
    const usuarioEntity = await this.usuarioRepository.getUsuarioById(id);
    if (!usuarioEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuarioRepository.deleteUsuario(id);
    return {
      message: 'Usuário deletado com sucesso.',
    };
  }
}
