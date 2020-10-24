import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

import PermissionRepository from "repositories/PermissionRepository";
import AppError from "errors/AppError";

export default class UserController {
  async create(request: Request, response: Response) {
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description } = request.body;

    const existsPermission = await permissionRepository.findOne({ name });

    if (existsPermission) {
      throw new AppError('Permission already exists!');
    }

    const permission = permissionRepository.create({
      name,
      description,
    });

    await permissionRepository.save(permission);

    return response.status(201).json(permission);
  }
}
