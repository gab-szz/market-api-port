import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDate,
  MinLength,
  MaxLength,
  Min,
  ArrayMinSize,
  Matches,
  Validate,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CaracteristicaDto {
  @IsString({ message: 'O nome da característica deve ser um texto.' })
  @MinLength(1, { message: 'O nome da característica não pode ser vazio.' })
  nome: string;

  @IsString({ message: 'A descrição da característica deve ser um texto.' })
  @MinLength(1, {
    message: 'A descrição da característica não pode ser vazia.',
  })
  descricao: string;
}

export class ImagemDto {
  @IsString({ message: 'A URL da imagem deve ser um texto.' })
  @MinLength(1, { message: 'A URL da imagem não pode ser vazia.' })
  url: string;

  @IsString({ message: 'A descrição da imagem deve ser um texto.' })
  @MinLength(1, { message: 'A descrição da imagem não pode ser vazia.' })
  descricao: string;
}

export class CreateProdutoDto {
  @IsUUID(undefined, { message: 'ID de usuário inválido.' })
  usuarioId: string;

  @IsString({ message: 'O nome deve ser um texto.' })
  @MinLength(1, { message: 'O nome do produto não pode ser vazio.' })
  nome: string;

  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor do produto precisa ser maior que zero.' })
  @Validate(
    (value) =>
      Number.isFinite(value) && /^\d+(\.\d{1,2})?$/.test(value.toString()),
    {
      message: 'O valor deve ter até duas casas decimais.',
    },
  )
  valor: number;

  @IsNumber({}, { message: 'A quantidade disponível deve ser um número.' })
  @Min(0, { message: 'A quantidade precisa ser igual ou maior que zero.' })
  quantidadeDisponivel: number;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @MinLength(1, { message: 'A descrição não pode ser vazia.' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais que 1000 caracteres.',
  })
  descricao: string;

  @IsArray({ message: 'As características devem ser um array.' })
  @ArrayMinSize(3, {
    message: 'O produto precisa ter pelo menos 3 características.',
  })
  @ValidateNested({ each: true })
  @Type(() => CaracteristicaDto)
  caracteristicas: CaracteristicaDto[];

  @IsArray({ message: 'As imagens devem ser um array.' })
  @ArrayMinSize(1, { message: 'O produto precisa ter pelo menos 1 imagem.' })
  @ValidateNested({ each: true })
  @Type(() => ImagemDto)
  imagens: ImagemDto[];

  @IsString({ message: 'A categoria deve ser um texto.' })
  @MinLength(1, { message: 'A categoria do produto não pode ser vazia.' })
  categoria: string;

  @Type(() => Date)
  @IsDate({ message: 'A data de criação deve ser uma data.' })
  dataCriacao: Date;

  @Type(() => Date)
  @IsDate({ message: 'A data de atualização deve ser uma data.' })
  dataAtualizacao: Date;

  @IsOptional()
  @IsString({ message: 'A imagem deve ser um texto.' })
  imagem?: string;
}
