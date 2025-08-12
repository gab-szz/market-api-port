import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(email: string, args: ValidationArguments) {
    const userExists = await this.usuarioRepository.existsWithEmail(email);
    return !userExists; // Retornar true se o email for único, caso contrário false
  }

  defaultMessage(args: ValidationArguments) {
    return 'O email deve ser único.';
  }
}

export const UniqueEmail = (validateOptions: ValidationOptions) => {
  return (target: Object, propertyName: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
