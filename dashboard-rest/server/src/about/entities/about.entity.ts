import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About extends BaseEntity {
  constructor(
    name: string,
    experience: string,
    specialty: string,
    bio: string[],
  ) {
    super();
    this.name = name;
    this.experience = experience;
    this.specialty = specialty;
    this.bio = bio;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  experience: string;

  @Column()
  specialty: string;

  @Column('text', { array: true, nullable: true })
  bio: string[];

  @Column({ nullable: true })
  image: string;
}
