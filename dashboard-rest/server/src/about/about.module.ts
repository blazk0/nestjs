import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutController } from './about.controller';
import { AboutRepository } from './about.repository';
import { AboutService } from './about.service';

@Module({
  controllers: [AboutController],
  providers: [AboutService],
  imports: [TypeOrmModule.forFeature([AboutRepository])],
})
export class AboutModule {}
