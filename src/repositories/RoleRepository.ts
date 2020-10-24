import { EntityRepository, Repository } from 'typeorm';

import Role from 'models/Role';

@EntityRepository(Role)
export default class RoleRepository extends Repository<Role> {}
