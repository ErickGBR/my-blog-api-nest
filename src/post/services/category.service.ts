import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save({
      ...newCategory,
      slug: createCategoryDto.slug ?? this.slugify(createCategoryDto.name)
    });
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.findCategory(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findCategory(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.findCategory(id);
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return this.categoryRepository.delete(id);
  }

  private findCategory(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  private slugify(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  }
}