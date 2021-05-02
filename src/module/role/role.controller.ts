import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';


@Controller('roles')
export class RoleController {

    constructor(
        private readonly _roleService: RoleService
    ) {

    }

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id: number): Promise<ReadRoleDto> {
        const role = await this._roleService.get(id);
        return role;
    }

    @Get()
    async getRoles(): Promise<ReadRoleDto[]> {
        const roles = await this._roleService.getAll();
        return roles;
    }


    @Post()
    async createRole(@Body() role: CreateRoleDto): Promise<ReadRoleDto> {
        const createdRole = await this._roleService.create(role);
        return createdRole;
    }

    @Patch(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: UpdateRoleDto): Promise<ReadRoleDto> {
        const updatedRole = await this._roleService.update(id, role);
        return updatedRole;
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number) {
        await this._roleService.delete(id);
        return true
    }
}
