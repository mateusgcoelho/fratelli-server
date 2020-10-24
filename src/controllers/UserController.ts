import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserRepository from "repositories/UserRepository";
import RoleRepository from "repositories/RoleRepository";
import AppError from "errors/AppError";
import { classToClass } from "class-transformer";

export default class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);

    const { name, email, password } = request.body;

    const existsUser = await userRepository.findOne({ email });

    if (existsUser) {
      throw new AppError('User already exists!');
    }

    const passwordHashed = await hash(password, 8);

    // const existsRoles = await roleRepository.findByIds(roles);
    const userRole = await roleRepository.findOne({ name: 'ROLE_USER' });

    if (!userRole) throw new AppError('Internal server error!');

    const user = userRepository.create({
      name,
      email,
      password: passwordHashed,
      roles: [userRole],
    });

    await userRepository.save(user);

    return response.status(201).json(classToClass(user));
  }
}
