import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
