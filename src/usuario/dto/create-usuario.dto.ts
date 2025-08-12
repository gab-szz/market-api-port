import { IsString, IsEmail, MinLength, IsOptional, Validate } from 'class-validator';
import { UniqueEmailValidator } from '../validation/UniqueEmailValidator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @Validate(UniqueEmailValidator, { message: 'E-mail já está em uso.' })
  email: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  senha: string;

  @IsOptional()
  @IsString({ message: 'O perfil deve ser um texto.' })
  perfil?: string;
}
