import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  constructor(name: string, description: string, qty: number) {
    this.name = name;
    this.description = description;
    this.qty = qty;
  }

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  qty: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
