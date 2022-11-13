import { NextFunction } from 'express';

import * as AuthDAO from '../../dao/auth/authDAO';
import { LoginDTO } from '../../dto/auth/loginDTO';
import { Role } from '../../orm/entities/users/types';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtToken } from '../../utils/createJwtToken';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const login = async (loginDTO: LoginDTO): Promise<string> => {
  const user = await AuthDAO.getByEmail(loginDTO.email);

  if (!user || !user.checkIfPasswordMatch(loginDTO.password)) {
    throw new CustomError(400, 'General', 'Not Found', ['Incorrect email or password']);
  }

  const jwtPayload: JwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    created_at: user.created_at,
  };
  return createJwtToken(jwtPayload);
};
