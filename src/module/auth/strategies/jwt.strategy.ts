import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigurationEnum } from "../../../config/config.keys";
import { ConfigService } from "../../../config/config.service";
import { AuthRepository } from "../auth.repository";
import { IJwtPayload } from "../jwt-payload.interface";

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly _configService: ConfigService,
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(ConfigurationEnum.JWT_SECRET)
        });
    }


    /**Validar si el usuario existe */
    async validate(payload: IJwtPayload) {
        const { username } = payload;
        const user = await this._authRepository.findOne({
            where: { username: username, status: 'ACTIVE' }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}