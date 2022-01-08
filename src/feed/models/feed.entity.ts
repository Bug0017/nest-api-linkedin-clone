import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('feed')
export class FeedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()   
  updatedAt: Date;
}