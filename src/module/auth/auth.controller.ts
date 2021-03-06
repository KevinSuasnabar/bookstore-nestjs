import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) {

    }

    @Post('/signup')
    @UsePipes(ValidationPipe)//para que se cumplan las validaciones que tiene nuestro dto
    async signup(@Body() signupDto: SignupDto): Promise<void> {
        return this._authService.signup(signupDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)//para que se cumplan las validaciones que tiene nuestro dto
    async signin(@Body() signinDto: SigninDto) {
        return this._authService.signin(signinDto);
    }

}
