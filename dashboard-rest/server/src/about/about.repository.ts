import { EntityRepository, Repository } from 'typeorm';
import { About } from './entities/about.entity';

@EntityRepository(About)
export class AboutRepository extends Repository<About> {}
