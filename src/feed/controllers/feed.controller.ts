import { Feed } from './../models/feed.interface';

import { FeedService } from './../services/feed.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';


@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
  @Post('create')
  create(@Body() feed: Feed) {
    return this.feedService.createFeed(feed);
  }

  @Get()
  findAllFeed() {
    return this.feedService.findAllFeed();
  }

  @Put('update/:id')
  updatedFeed(@Param('id') id: string, @Body() updatedFeed: Feed) {
    return this.feedService.updatedFeed(id, updatedFeed);
  }

  @Delete('delete/:id')
  deleteFeed(@Param('id') id: string) {
      return this.feedService.deleteFeed(id)
  }
}
