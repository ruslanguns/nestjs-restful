import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { validate } from 'class-validator';
import * as crypto from 'crypto';
import { LoginUserDTO } from './dto/login.dto';
import { SECRET } from '../../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<Users>,
    ) { }

    async create(dto: CreateUserDTO): Promise<Users> {

        // Checking if user exist
        const USER_EXIST = await this.userModel.findOne({ $or: [{ username: dto.username }, { email: dto.email }] });
        if (USER_EXIST) { throw new BadRequestException(`El usuario ya está registrado.`); }

        // dto.password = bcrypt.hashSync(dto.password, 10);
        dto.password = crypto.createHmac('sha256', dto.password).digest('hex');
        dto.modifiedAt = new Date();

        // creating a new user
        const ERRORS = await validate(dto);
        if (ERRORS.length > 0) {
            const _ERROR = { username: 'User input is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', _ERROR }, HttpStatus.BAD_REQUEST);

        } else {
            const USER = new this.userModel(dto);
            return await USER.save();
        }
    }

    async findOne(loginUserDto: LoginUserDTO) {
        const findOneOptions = {
            $or: [
                {
                    email: loginUserDto.email,
                    password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
                },
                {
                    username: loginUserDto.username,
                    password: crypto.createHmac('sha256', loginUserDto.password).digest('hex'),
                },

            ],
        };

        return await this.userModel.findOne(findOneOptions);
    }

    async getUsers(): Promise<Users[]> {
        const USERS = await this.userModel.find();
        return USERS;
    }

    async getUser(userId: string): Promise<Users> {
        const USER = await this.userModel.findById(userId);
        return USER;
    }

    async updateUser(userId: string, createUserDto: CreateUserDTO): Promise<Users> {
        const UPDATED_USER = await this.userModel.findByIdAndUpdate(userId, createUserDto, { new: true });
        return UPDATED_USER;
    }

    async deleteUser(userId: string): Promise<Users> {
        const DELETED_USER = await this.userModel.findOneAndDelete(userId);
        return DELETED_USER;
    }


    async findById(id) {
        const USER = await this.userModel.findById(id);
        
        return this.buildUserRO(USER);
    }

    async findByEmail(email: string): Promise<any> {
        const USER = await this.userModel.findOne({ email });
        return this.buildUserRO(USER);
    }

    public generateJWT(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, SECRET);
    }

    private buildUserRO(user: any) {
        const userRO = {
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            token: this.generateJWT(user),
        };

        return { user: userRO };
    }

}
