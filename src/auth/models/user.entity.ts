import { FeedEntity } from './../../feed/models/feed.entity';
 
 import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.enum";
 
 @Entity('user')
 export class UserEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ unique: true })
   email: string;

   @Column({ select: false })
   password: string;

   @Column({ type: 'enum', enum: Role, default: Role.USER })
   role: Role;

   @OneToMany(() => FeedEntity, (feedEntity) => feedEntity.author)
   feeds: FeedEntity[];
 }