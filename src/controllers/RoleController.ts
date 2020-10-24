import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

import RoleRepository from "repositories/RoleRepository";
import PermissionRepository from "repositories/PermissionRepository";
import AppError from "errors/AppError";

export default class UserController {
  async create(request: Request, response: Response) {
    const roleRepository = getCustomRepository(RoleRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description, permissions } = request.body;

    const existsRole = await roleRepository.findOne({ name });

    if (existsRole) {
      throw new AppError('Role already exists!');
    }

    const existsPermissions = await permissionRepository.findByIds(permissions);

    const role = roleRepository.create({
      name,
      description,
      permissions: existsPermissions,
    });

    await roleRepository.save(role);

    return response.status(201).json(role);
  }
}
