import bcrypt from 'bcryptjs';

import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

import uploadConfig from 'config/uploadConfig';

import ProductRepository from "repositories/ProductRepository";
import AppError from "errors/AppError";
import { classToClass } from 'class-transformer';

export default class UserController {
  async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    var products = await productRepository.find();

    products = classToClass(products);

    return response.json({ products, total: products.length });
  }

  async create(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { name, description, price } = request.body;

    const existsProduct = await productRepository.findOne({ name: name });

    if (existsProduct) {
      throw new AppError('Product already exists!');
    }

    const date = new Date();

    date.setMilliseconds(0);
    date.setSeconds(0);
    const fileName = `${date.getDate()}-${date.getTime()}-${request.file.originalname}`;

    const product = productRepository.create({
      name,
      description,
      price,
      photo: fileName,
    });

    await productRepository.save(product);

    return response.status(201).json(classToClass(product));
  }
}
