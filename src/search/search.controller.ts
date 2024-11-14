import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResponse } from './interfaces/track.interfaces';
import { SearchTracksDto } from './dto/search.dto';

@Controller('search_tracks')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async getTracks(@Query() query: SearchTracksDto): Promise<SearchResponse> {
    return this.searchService.fetchTracks(query.name);
  }
}
