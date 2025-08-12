import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { ListUsuarioDto } from './dto/list-usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    return usuariosSalvos.map(
      (usuario) => new ListUsuarioDto(usuario.id, usuario.nome),
    );
  }

  async criaUsuario(
    dto: CreateUsuarioDto,
  ): Promise<{ usuario: ListUsuarioDto; message: string }> {
    const usuarioEntity = this.usuarioRepository.create({
      ...dto,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    });
    await this.usuarioRepository.save(usuarioEntity);
    return {
      usuario: new ListUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso.',
    };
  }

  async atualizaUsuario(
    id: string,
    dto: UpdateUsuarioDto,
  ): Promise<{ usuario: ListUsuarioDto; message: string }> {
    const usuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuarioEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(usuarioEntity, dto, { dataAtualizacao: new Date() });
    await this.usuarioRepository.save(usuarioEntity);
    return {
      usuario: new ListUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário atualizado com sucesso.',
    };
  }

  async deletaUsuario(id: string): Promise<{ message: string }> {
    const usuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuarioEntity) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.usuarioRepository.delete(id);
    return {
      message: 'Usuário deletado com sucesso.',
    };
  }
}
