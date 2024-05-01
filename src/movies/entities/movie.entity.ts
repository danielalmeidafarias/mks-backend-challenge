import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user_id: string

    @Column({length: 50})
    title: string

    @Column({length: 400})
    synopsis: string

    @Column()
    original_title: string

    @Column()
    language: string

    @Column()
    original_language: string

    @Column()
    duration_in_minutes: string

    @Column()
    release_date: string

    @Column('json')
    genre: string[]

    @Column()
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
}
