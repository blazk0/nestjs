import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import key from './config/keys';

@Module({
  imports: [ItemsModule, MongooseModule.forRoot(key.mongoURI)],
})
export class AppModule {}
