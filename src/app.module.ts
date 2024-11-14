import { Module } from '@nestjs/common';

import { SearchModule } from './search/search.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: +process.env.TTL,
      max: +process.env.MAX,
    }),
    SearchModule,
  ],
})
export class AppModule {}
