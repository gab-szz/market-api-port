import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CaracteristicaDto {
  @IsString({ message: 'O nome da característica deve ser um texto.' })
  nome: string;

  @IsString({ message: 'A descrição da característica deve ser um texto.' })
  descricao: string;
}

export class ImagemDto {
  @IsString({ message: 'A URL da imagem deve ser um texto.' })
  url: string;

  @IsString({ message: 'A descrição da imagem deve ser um texto.' })
  descricao: string;
}

export class CreateProdutoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  nome: string;

  @IsNumber({}, { message: 'O valor deve ser um número.' })
  valor: number;

  @IsNumber({}, { message: 'A quantidade disponível deve ser um número.' })
  quantidadeDisponivel: number;

  @IsString({ message: 'A descrição deve ser um texto.' })
  descricao: string;

  @IsArray({ message: 'As características devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => CaracteristicaDto)
  caracteristicas: CaracteristicaDto[];

  @IsArray({ message: 'As imagens devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ImagemDto)
  imagens: ImagemDto[];

  @IsString({ message: 'A categoria deve ser um texto.' })
  categoria: string;

  @IsDate({ message: 'A data de criação deve ser uma data.' })
  dataCriacao: Date;

  @IsDate({ message: 'A data de atualização deve ser uma data.' })
  dataAtualizacao: Date;

  @IsOptional()
  @IsString({ message: 'A imagem deve ser um texto.' })
  imagem?: string;
}
