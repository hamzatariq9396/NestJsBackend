import { Column,PrimaryGeneratedColumn,Entity} from 'typeorm'

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:string
    @Column()
    title:string
    @Column()
    description:string
    @Column()
    price:number
}