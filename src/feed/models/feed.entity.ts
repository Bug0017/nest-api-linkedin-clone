import { UserEntity } from './../../auth/models/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @ManyToOne(()=> UserEntity, (userEntity)=> userEntity.feeds)
  author: UserEntity
}