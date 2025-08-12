import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CreateUsuarioDto) {
    const resultado = await this.usuarioService.criaUsuario(dadosDoUsuario);
    return resultado;
  }

  @Get()
  async listaUsuarios() {
    return await this.usuarioService.listUsuarios();
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: UpdateUsuarioDto,
  ) {
    const resultado = await this.usuarioService.atualizaUsuario(id, novosDados);
    return resultado;
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const resultado = await this.usuarioService.deletaUsuario(id);
    return resultado;
  }
}
