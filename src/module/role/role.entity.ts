import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createdAt: Date;


    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}