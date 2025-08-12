import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.interface';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async saveUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    this.usuarios.push(usuario);
    console.log(this.usuarios);
    return usuario;
  }

  async getUsuario(): Promise<UsuarioEntity[]> {
    return this.usuarios;
  }

  async existsWithEmail(email: string): Promise<boolean> {
    const usuario = this.usuarios.find((user) => user.email === email);
    return !!usuario;
  }

  async getUsuarioById(id: string): Promise<UsuarioEntity> {
    console.log(id);
    console.log(this.usuarios);
    const usuario = this.usuarios.find((user) => user.id === id);
    return usuario;
  }

  async updateUsuario(
    id: string,
    UpdateData: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity> {
    const user = this.usuarios.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, UpdateData);
    return user;
  }

  async deleteUsuario(id: string): Promise<void> {
    const user = this.usuarios.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    this.usuarios.splice(this.usuarios.indexOf(user), 1);
  }
}
