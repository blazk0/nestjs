import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AboutService } from './about.service';
import { AboutDto } from './dto/about.dto';
import { About } from './entities/about.entity';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.getAbout();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  saveAbout(
    @Body(ValidationPipe) aboutDto: AboutDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<About> {
    return this.aboutService.saveAbout(aboutDto, image);
  }
}
