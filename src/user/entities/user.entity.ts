import { Movie, MovieEntity } from "src/movies/entities/movie.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

export interface IUserContructorParameter {
    email: string,
    password: string
    nickname: string,
    id?: string,
}

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    nickname: string

    @Column()
    @Unique('email', ['email'])
    email: string

    @Column()
    password: string

    @OneToMany(() => MovieEntity, movie => movie.user)
    movies: MovieEntity[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export class User extends UserEntity {
    constructor({ email, password, nickname,id }: IUserContructorParameter) {
        super()
        this.email = email
        this.password = password
        this.nickname = nickname

        if (id) {
            this.id = id
        }
    }
}
