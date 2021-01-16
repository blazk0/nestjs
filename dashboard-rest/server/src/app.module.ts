import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm';
import { AboutModule } from './about/about.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, AboutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
