import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReadUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) {

    }

    // @Roles('AUTHOR')
    // @UseGuards(AuthGuard(), RoleGuard)
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
        const user = await this._userService.get(id);
        return user;
    }

    @Get()
    @UseGuards(AuthGuard())
    async getUsers(): Promise<any> {
        const users = await this._userService.getAll();
        return {
            users: users
        };
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        const updatedUser = await this._userService.update(id, user);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true
    }

    @Post('set-role/:userId/:roleId')
    async setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number) {
        const createdUser = await this._userService.setRoleToUser(userId, roleId);
        return createdUser;
    }
}
