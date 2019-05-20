import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Res,
    Body,
    HttpStatus,
    Param,
    BadRequestException,
    NotFoundException,
    HttpException,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { ValidateObjectId } from './../../shared/pipes/validate-object-id.pipe';
import { LoginUserDTO } from './dto/login.dto';

@Controller('user')
export class UsersController {

    constructor(
        private userService: UsersService,
    ) { }

    @Post('/create')
    async register(
        @Res() res,
        @Body() createUserDTO: CreateUserDTO,
    ) {
        const USER_REGISTERED = await this.userService.create(createUserDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'User created',
            USER_REGISTERED,
        });
    }

    @Post('/login')
    async login(
        @Res() res,
        @Body() loginUserDTO: LoginUserDTO,
    ) {
        const _USER = await this.userService.findOne(loginUserDTO);
        const errors = { User: ' not found' };
        if (!_USER) { throw new HttpException({ errors }, 401); }

        const token = await this.userService.generateJWT(_USER);

        const { firstName, username, email, bio, avatar } = _USER;
        const USER = { firstName, username, token, email, bio, avatar };

        return res.status(HttpStatus.CREATED).json({
            message: 'Login Successful',
            USER,
        });
    }

    @Get('/list')
    async getUsers(
        @Res() res,
    ) {
        const USERS = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            USERS,
        });
    }

    @Get('/:userId')
    async getUser(
        @Res() res,
        @Param('userId', new ValidateObjectId()) userId,
    ) {
        const USER = await this.userService.getUser(userId);
        return res.status(HttpStatus.OK).json({
            USER,
        });
    }

    @Put('/update/:userId')
    async updateUser(
        @Res() res,
        @Param('userId', new ValidateObjectId()) userId,
        @Body() createUserDTO: CreateUserDTO,
    ) {
        const UPDATED_USER = await this.userService.updateUser(userId, createUserDTO)
            .catch(error => {
                throw new BadRequestException(error);
            });

        if (!UPDATED_USER) { throw new NotFoundException(`Product with ID: ${userId} does not exists.`) };
        return res.status(HttpStatus.OK).json({
            message: 'User updated Successfully',
            UPDATED_USER,
        });
    }

    @Delete('/delete/:userID')
    async deleteUser(
        @Res() res,
        @Param('userId', new ValidateObjectId()) userId,
    ) {
        const DELETED_USER = await this.userService.deleteUser(userId);
        return res.status(HttpStatus.ACCEPTED).json({
            message: 'User Deleted Successfully',
            DELETED_USER,
        });
    }

}
