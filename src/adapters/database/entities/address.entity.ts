import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column({ type: 'varchar' })
  public zipCode: string;

  @Column({ type: 'varchar' })
  public street: string;

  @Column({ type: 'varchar' })
  public number: string;

  @Column({ type: 'varchar', nullable: true })
  public complement?: string;

  @Column({ type: 'varchar' })
  public city: string;

  @Column({ type: 'varchar' })
  public neighborhood: string;

  @Column({ type: 'varchar' })
  public state: string;
}
