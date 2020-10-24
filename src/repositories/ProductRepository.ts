import { EntityRepository, Repository } from 'typeorm';

import Product from 'models/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {}
