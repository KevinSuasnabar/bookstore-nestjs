import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../shared/entity-status.enum';
import { RoleRepository } from '../role/role.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ReadUserDto } from './dto';
import { UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ) { }

    /**
     * Usuario por id
     * @param id 
     */
    async get(id: number): Promise<ReadUserDto> {
        if (!id) {
            throw new BadRequestException('El id no ha sido recibido');
        }
        const user: User = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!user) {
            throw new NotFoundException();
        }


        return plainToClass(ReadUserDto, user);
    }

    /**
     * Obtener todos los usuarios
     * 
     */
    async getAll(): Promise<ReadUserDto[]> {
        const users: User[] = await this._userRepository.find({
            where: { status: Status.ACTIVE }
        });
        return users.map((user: User) => plainToClass(ReadUserDto, user));
    }


    /**
     * Modificar un usuario
     * 
     */
    async update(id: number, user: UpdateUserDto): Promise<ReadUserDto> {
        const userFind = await this._userRepository.findOne(id);
        if (!userFind) {
            throw new NotFoundException('El usuario que deseas modificar no existe');
        }

        userFind.username = user.username;
        userFind.details.lastname = user.lastname;
        userFind.details.name = user.name;



        const updatedUSer = await this._userRepository.save(userFind);
        return plainToClass(ReadUserDto, updatedUSer)
    }

    /**
     * Borrar un usuario
     * 
     */
    async delete(id: number): Promise<void> {
        const userFind = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });
        if (!userFind) {
            throw new NotFoundException();
        }

        const updatedUSer = await this._userRepository.update(id, { status: Status.INACTIVE });

    }

    async setRoleToUser(userId: number, releId: number) {
        const userFind = await this._userRepository.findOne(userId, {
            where: { status: Status.ACTIVE }
        });
        if (!userFind) {
            throw new NotFoundException('Usuario does not exist');
        }
        const roleFind = await this._roleRepository.findOne(releId, {
            where: { status: Status.ACTIVE }
        });
        if (!roleFind) {
            throw new NotFoundException('Role does not exist');
        }

        //FALTA VALIDAR SI ESE USUARIO YA TIENE ESE ROL
        userFind.roles.push(roleFind);
        await this._userRepository.save(userFind);
        return true;




    }

}
