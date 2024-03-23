import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn('increment')
  public personId: number;

  @Column({ type: 'varchar', length: 1 })
  public personType: string;

  @Column({ type: 'varchar', nullable: true, length: 14 })
  public cnpj?: string;

  @Column({ type: 'varchar', length: 11 })
  public cpf: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public phone?: string;

  @Column({ type: 'varchar' })
  public cellPhone: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'boolean' })
  public termsAccept: boolean;

  @OneToOne(() => AddressEntity, (entity) => entity.id, { cascade: true })
  @JoinColumn({ name: 'address' })
  public address: AddressEntity;
}
