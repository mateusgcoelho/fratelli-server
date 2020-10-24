import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";

import UserRepository from "repositories/UserRepository";
import RoleRepository from "repositories/RoleRepository";
import PermissionRepository from "repositories/PermissionRepository";
import { hash } from "bcryptjs";

export class AddInformationsDefault1603288382906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const userRepository = getCustomRepository(UserRepository);
      const rolesRepository = getCustomRepository(RoleRepository);
      const permissionRepository = getCustomRepository(PermissionRepository);

      const createProduct = permissionRepository.create({
        name: 'create_product',
        description: 'Create product',
      });

      const editProduct = permissionRepository.create({
        name: 'edit_product',
        description: 'Edit product',
      });

      const viewProduct = permissionRepository.create({
        name: 'view_product',
        description: 'View product',
      });

      const deleteProduct = permissionRepository.create({
        name: 'delete_product',
        description: 'Delete product',
      });

      const listAllProducts = permissionRepository.create({
        name: 'list_products',
        description: 'List all products',
      });

      const arrayAdminPermissions = [
        createProduct,
        editProduct,
        viewProduct,
        deleteProduct,
        listAllProducts
      ];

      await permissionRepository.save(arrayAdminPermissions);

      const roleAdmin = rolesRepository.create({
        name: 'ROLE_ADMIN',
        description: 'Admin',
        permissions: arrayAdminPermissions,
      });

      const roleUser = rolesRepository.create({
        name: 'ROLE_USER',
        description: 'User',
        permissions: [listAllProducts],
      });

      await rolesRepository.save([roleAdmin, roleUser]);

      const passwordHashed = await hash('123456', 8);

      const user = userRepository.create({
        name: 'Admin',
        email: 'admin@fratelli.com',
        password: passwordHashed,
        roles: [roleAdmin],
      });

      await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const userRepository = getCustomRepository(UserRepository);
      const rolesRepository = getCustomRepository(RoleRepository);
      const permissionRepository = getCustomRepository(PermissionRepository);

      const createProduct = await permissionRepository.findOne({ name: 'create_product' });
      const editProduct = await permissionRepository.findOne({ name: 'edit_product' });
      const viewProduct = await permissionRepository.findOne({ name: 'view_product' });
      const deleteProduct = await permissionRepository.findOne({ name: 'delete_product' });
      const listAllProducts = await permissionRepository.findOne({ name: 'list_products' });

      if (!createProduct || !editProduct || !viewProduct || !deleteProduct || !listAllProducts) return;

      await permissionRepository.remove(createProduct);
      await permissionRepository.remove(editProduct);
      await permissionRepository.remove(viewProduct);
      await permissionRepository.remove(deleteProduct);
      await permissionRepository.remove(listAllProducts);

      const roleAdmin = await rolesRepository.findOne({ name: 'ROLE_ADMIN' });
      const roleUser = await rolesRepository.findOne({ name: 'ROLE_USER' });

      if (!roleAdmin || !roleUser) return;

      await rolesRepository.remove(roleAdmin);
      await rolesRepository.remove(roleUser);

      const userAdmin = await userRepository.findOne({ email: 'admin@fratelli.com' });

      if (!userAdmin) return;

      await userRepository.remove(userAdmin);
    }

}
