import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Role } from '../role/role.entity';
import { UserDetail } from './user.details.entity';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createdAt: Date


    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date

    /**
     * 'eager' sirve si obtengo datos de usuario tambien trae de su detalle
     * 'cascade' sirve para cuando guardo un objeto user en la bd automaticmente se guarda su detalle
     *  */
    @OneToOne(type => UserDetail, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: 'detail_id' })
    details: UserDetail

    @ManyToMany(type => Role, role => role.users, { eager: true })
    @JoinTable({ name: 'user_roles' })
    roles: Role[];
}