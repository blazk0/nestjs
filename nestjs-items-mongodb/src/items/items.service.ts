import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<ItemDocument[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<ItemDocument> {
    const item = await this.itemModel.findById(id);

    if (!item) {
      throw new NotFoundException(`item of id ${id} not found`);
    }

    return item;
  }

  async create(item: CreateItemDto): Promise<ItemDocument> {
    const newItem = new this.itemModel(item);

    return await newItem.save();
  }

  async update(id: string, item: CreateItemDto): Promise<ItemDocument | null> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<ItemDocument | null> {
    return await this.itemModel.findByIdAndRemove(id);
  }
}
