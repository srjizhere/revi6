import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/userModel';

export const roleVerify = (requiredRoles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const roles = req.body.roles;
        const hasRequiredRole = requiredRoles.some((role) => roles.includes(role));
        if (!hasRequiredRole) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Role verify failed' });
      }
    };
  };
  