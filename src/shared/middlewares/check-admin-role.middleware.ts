import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckAdminRoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const USER = req.user;

    if (USER.role === 'ADMIN_ROLE') {
      // Si es valido vamos a ejecutar los procesos
      console.log('Es ADMIN');
      next();
      return;
    } else {
      // Si no es un usuario Admin mandaremos error.
      console.log('No es ADMIN');
      return res.status(401).json({
        ok: false,
        mensaje: 'Token incorrecto — No es administrador',
        errors: { message: 'No es administrador, no puede hacer eso' }
      });
    }
  }
}
