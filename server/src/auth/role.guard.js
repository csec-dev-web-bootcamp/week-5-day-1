import { HttpException } from '../common/http-exception';

export function roleGuard(roles) {
  return (req, res, next) => {
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new HttpException('Forbidden', 403);
    }
  };
}
