import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './usuario.repository';
import { UniqueEmailValidator } from './validation/UniqueEmailValidator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, UniqueEmailValidator],
})
export class UsuarioModule {}
