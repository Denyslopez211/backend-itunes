import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SearchResponse } from './interfaces/track.interfaces';
import { buildResponse, getFilteredTracks, getUniqueAlbums } from './data-util';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  @CacheKey(process.env.CACHE_KEY)
  @CacheTTL(+process.env.TTL)
  async fetchTracks(name: string): Promise<SearchResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.URL_BASE}?term=${name}`),
      );
      const data = response.data;
      const filteredTracks = getFilteredTracks(data.results, name);
      const albums: string[] = getUniqueAlbums(filteredTracks);
      return buildResponse(filteredTracks, albums);
    } catch (error) {
      throw new HttpException(
        `Error fetching data from iTunes API: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
