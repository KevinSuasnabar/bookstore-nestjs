import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity('products')
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'numeric', nullable: false })
    price: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createdAt: Date


    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date

}