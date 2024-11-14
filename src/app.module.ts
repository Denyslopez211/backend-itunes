import { Module } from '@nestjs/common';

import { SearchModule } from './search/search.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // 1 hour
      max: 10, // Maximum number of items in cache
    }),
    SearchModule,
  ],
})
export class AppModule {}
