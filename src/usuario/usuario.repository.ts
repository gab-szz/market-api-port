import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario.interface';

@Injectable()
export class UsuarioRepository {
  private usuarios: Usuario[] = [];

  async saveUsuario(usuario: Usuario): Promise<Usuario> {
    this.usuarios.push(usuario);
    console.log(this.usuarios);
    return usuario;
  }

  async getUsuario(): Promise<Usuario[]> {
    return this.usuarios;
  }
}
