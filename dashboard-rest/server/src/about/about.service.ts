import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutRepository } from './about.repository';
import { AboutDto } from './dto/about.dto';
import { About } from './entities/about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutRepository)
    private aboutRepository: AboutRepository,
  ) {}

  async getAbout(): Promise<About> {
    const about = await this.aboutRepository.findOne({ id: 1 });

    if (about) {
      return about;
    }

    throw new NotFoundException();
  }

  saveAbout(aboutDto: AboutDto, image: Express.Multer.File): Promise<About> {
    aboutDto.bio = String(aboutDto.bio).split(', ');
    aboutDto.id = Number(aboutDto.id);
    aboutDto.image = image.originalname;

    console.log(aboutDto);

    return this.aboutRepository.save(aboutDto);
  }
}
