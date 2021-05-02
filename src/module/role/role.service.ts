import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Role } from '../role/role.entity';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dto';
import { RoleRepository } from './role.repository';


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ) { }

    /**
     * Usuario por id
     * @param id 
     */
    async get(id: number): Promise<ReadRoleDto> {
        if (!id) {
            throw new BadRequestException('El id no ha sido recibido');
        }
        const role: Role = await this._roleRepository.findOne(id, {
            where: { status: 'ACTIVE' }
        });

        if (!role) {
            throw new NotFoundException();
        }
        return plainToClass(ReadRoleDto, role);//para castear
    }

    /**
     * Obtener todos los usuarios
     * 
     */
    async getAll(): Promise<ReadRoleDto[]> {
        const roles: Role[] = await this._roleRepository.find({
            where: { status: 'ACTIVE' }
        });
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
    }


    /**
     * Crear un usuario
     * 
     */
    async create(role: CreateRoleDto): Promise<ReadRoleDto> {

        const savedRole = await this._roleRepository.save(role);

        return plainToClass(ReadRoleDto, savedRole);
    }

    /**
     * Modificar un usuario
     * 
     */
    async update(id: number, role: UpdateRoleDto): Promise<ReadRoleDto> {
        const roleFind = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
        if (!roleFind) {
            throw new NotFoundException('El rol a modificar no existe');
        }
        roleFind.name = role.name;
        roleFind.description = role?.description;

        const updatedRole = await this._roleRepository.save(roleFind);
        return plainToClass(ReadRoleDto, updatedRole)

    }

    /**
     * Borrar un usuario
     * 
     */
    async delete(id: number): Promise<void> {
        const roleFind = await this._roleRepository.findOne(id, {
            where: { status: 'ACTIVE' }
        });
        if (!roleFind) {
            throw new NotFoundException();
        }

        const updatedUSer = await this._roleRepository.update(id, { status: 'INACTIVE' });

    }

}
