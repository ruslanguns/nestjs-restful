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
    OnModuleInit,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidateObjectId } from './../../shared/pipes/validate-object-id.pipe';
import { LoginUserDTO } from './dto/login.dto';
import { User } from './users.decorator';
import { Users } from './interfaces/users.interface';
import { Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';


@ApiUseTags('api')
@Controller('user')
export class UsersController implements OnModuleInit {

    private logger = new Logger('User Module');

    constructor(
        private userService: UsersService,
    ) { }

    onModuleInit() {
        this.logger.log('User Module Loaded...');
    }

    @ApiOperation({ title: 'Obtener informacion de usuario' })
    @Get('myinfo')
    async findMe(
        @User('email') email: string,
    ): Promise<Users> {
        return await this.userService.findByEmail(email);
    }

    @ApiOperation({ title: 'Crear usuario' })
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

    @ApiOperation({ title: 'Login de usuario' })
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

    @ApiBearerAuth()
    @ApiOperation({ title: 'Obtener lista de usuarios' })
    @Get('/list')
    async getUsers(
        @Res() res,
    ) {
        const USERS = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            USERS,
        });
    }

    @ApiBearerAuth()
    @ApiOperation({ title: 'Obtener cliente por ID' })
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

    @ApiBearerAuth()
    @ApiOperation({ title: 'Actualizar cliente por ID' })
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

        if (!UPDATED_USER) { throw new NotFoundException(`Product with ID: ${userId} does not exists.`); };
        return res.status(HttpStatus.OK).json({
            message: 'User updated Successfully',
            UPDATED_USER,
        });
    }

    @ApiBearerAuth()
    @ApiOperation({ title: 'Eliminar cliente por ID' })
    @Delete('/delete/:userId')
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
