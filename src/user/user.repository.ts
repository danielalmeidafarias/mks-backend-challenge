import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User, UserEntity } from "./entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(private dataSource: DataSource) { }

    async create(user: User) {
        try {
            return this.dataSource.getRepository(UserEntity).createQueryBuilder('create_user').insert().values(user).execute()
        } catch (err) {
            console.error(err)
            throw new HttpException('An error occured when creating the user, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOneByEmail(email: string) {
        try {
            const user = await this.dataSource.getRepository(UserEntity).createQueryBuilder('user_by_email').where("user.email = :email", { email }).getOne()
            return user
        } catch (err) {
            throw new HttpException('An error occured when trying to find the user, please try again later', HttpStatus.BAD_REQUEST)
        }
    }

    async findOneById(id: string) {
        try {
            const user = await this.dataSource.getRepository(UserEntity).createQueryBuilder('user_by_id').select('user.id').from(UserEntity, 'user').where("user.id = :id", { id }).getOne()
                
            return user
        } catch (err) {
            console.error(err)
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll() {
        try {
            const users = await this.dataSource.getRepository(UserEntity)
                .createQueryBuilder('users')
                .select('user.id')
                .from(UserEntity, 'user')
                .orderBy('user.created_at', 'DESC')
                .getMany()
            return users
        } catch (err) {
            console.error(err)
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(user: User) {
        try {
            const new_user = this.dataSource.getRepository(UserEntity).createQueryBuilder('update_user').where("user.id =: id", { id: user.id }).update({
                email: user.email,
                password: user.password,
            }).execute()

        } catch (err) {
            console.error(err)
            throw new HttpException('An error occured when updating the user, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: string) {
        try {
            this.dataSource.getRepository(UserEntity).createQueryBuilder('delete_user').where("user.id = :id", { id }).delete()

        } catch (err) {
            console.error(err)
            throw new HttpException('An error occured when deleting the user, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}