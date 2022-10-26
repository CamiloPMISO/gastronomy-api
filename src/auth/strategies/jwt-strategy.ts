import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from '../../shared/security/jwtConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants.JWT_SECRET,
        });
    }
   
    async validate(payload: any) {
        return { id: payload.sub, username: payload.username, roles: payload.roles, permissions: payload.permissions};
    }
}