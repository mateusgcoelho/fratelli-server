import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import authConfig from '../config/auth';

import UserRepository from "repositories/UserRepository";
import AppError from "errors/AppError";
import { classToClass } from "class-transformer";

export default class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    var user = await userRepository.findOne({ email }, { relations: ['roles'] });

    if (!user) {
      throw new AppError('User not found!');
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new AppError('Incorrect password or username!', 401);
    }

    const { secret, expiresIn } = authConfig;

    const roles = user.roles.map(role => role.name);

    const token = sign({ roles }, secret, {
      subject: user.id,
      expiresIn,
    });

    user = classToClass(user);

    return response.json({
      token,
      user,
    });
  }
}
