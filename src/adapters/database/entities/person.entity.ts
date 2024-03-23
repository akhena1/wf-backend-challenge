import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar' })
  public zipCode: string;

  @Column({ type: 'varchar' })
  public street: string;

  @Column({ type: 'varchar' })
  public number: string;

  @Column({ type: 'varchar' })
  public city: string;

  @Column({ type: 'varchar' })
  public neighborhood: string;

  @Column({ type: 'varchar' })
  public state: string;

  @Column({ type: 'varchar', nullable: true })
  public complement?: string;
}
