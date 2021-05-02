import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user_details')
export class UserDetail extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    lastname: string;


    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createdAt: Date


    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date
}