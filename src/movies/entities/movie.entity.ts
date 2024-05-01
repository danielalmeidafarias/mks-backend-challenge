import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export interface IMovieContructorParams {
    user_id: string,
    title: string,
    original_title: string,
    language: string,
    original_language: string,
    duration_in_minutes: string,
    synopsis: string,
    release_date: string,
    genre: string[],
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17',
    id?: string
}

@Entity()
export class MovieEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user_id: string

    @Column({ length: 50 })
    title: string

    @Column({ length: 400 })
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

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export class Movie extends MovieEntity {
    constructor(
        { title, original_title, language, original_language, user_id, synopsis, duration_in_minutes, release_date, genre, rating, id }: IMovieContructorParams
    ) {
        super()

        this.title = title
        this.user_id = user_id
        this.synopsis = synopsis
        this.original_title = original_title
        this.language = language
        this.original_language = original_language
        this.duration_in_minutes = duration_in_minutes
        this.release_date = release_date
        this.genre = genre
        this.rating = rating

        if (id) {
            this.id = id
        }
    }
}