import { EntityRepository, Repository } from 'typeorm';

import Permission from 'models/Permission';

@EntityRepository(Permission)
export default class PermissionRepository extends Repository<Permission> {}
