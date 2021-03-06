import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { SigninDto, SignupDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) {

    }

    async signup(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto;
        const userExists = await this._authRepository.findOne({
            where: [{ username: username }, { email: email }]
        });

        if (userExists) {
            throw new ConflictException("Username or email already exists!");
        }
        return this._authRepository.sigup(signupDto);
    }

    async signin(signinDto: SigninDto): Promise<any> {
        const { username, password } = signinDto;

        /**Comprobamos si existe un ussuario con ese username */
        const user: User = await this._authRepository.findOne({
            where: { username }
        });

        if (!user) {
            throw new NotFoundException("User does not exist!!");
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)//solo obtenemos los nombres de los roles
        }

        const token = await this._jwtService.sign(payload);
        return { 
            token: token,
            id: user.id,
            email: user.email,
            username: user.username,

         }
    }
}
