import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { stringify } from 'querystring';

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const USER = req.user;
    const ID = req.params.userId;

    if (String(USER.id) === ID || USER.role === 'ADMIN_ROLE') {
      // Si es valido vamos a ejecutar los procesos...
      console.log('VALIDO');
      next();
      return;
    } else {
      // Si no es usuario admin manda el error.
      console.log('INVALIDO');
      return res.status(401).json({
        ok: false,
        mensaje: 'Token incorrecto — No es administrador ni es el mismo usuario',
        errors: { message: 'No es administrador, no puede hacer eso' },
      });
    }
  }
}
