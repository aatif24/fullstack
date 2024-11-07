import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IAuth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_MODEL')
        private authModel: Model<IAuth>,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn({
        email,
        password,
    }: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(email);

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, email: user.email };

        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: '8h',
        });

        const auth = new this.authModel<IAuth>({
            token: access_token,
            user,
        });

        if (!(await auth.save())) {
            throw new UnauthorizedException();
        }

        return { access_token };
    }

    async findToken(token: string): Promise<IAuth> {
        return this.authModel.findOne<IAuth>({ token }).populate({
            path: 'user',
            model: 'User',
            select: { password: 0 },
            populate: {
                path: 'roles',
                model: 'Role',
                populate: {
                    path: 'permissions',
                    model: 'Permission',
                    populate: {
                        path: 'module',
                        model: 'Module',
                    },
                },
            },
        });
    }
}
