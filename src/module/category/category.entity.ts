import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity('categories')
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;


    @OneToMany(() => Product, product => product.category)
    products: Product[];


    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createdAt: Date


    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date

}