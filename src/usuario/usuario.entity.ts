import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario_entity', schema: 'public' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'senha', nullable: false })
  senha: string;

  @Column({ name: 'perfil', nullable: true })
  perfil?: string;

  @CreateDateColumn({ name: 'data_criacao', type: 'timestamp' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao', type: 'timestamp' })
  dataAtualizacao: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
