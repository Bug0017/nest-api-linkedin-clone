import { IsCreatorGuard } from './../guards/is-creator.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { JwtGuard } from './../../auth/guards/jwt.guard';
import { Feed } from './../models/feed.interface';

import { FeedService } from './../services/feed.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/models/role.enum';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  create(@Body() feed: Feed, @Request() req) {
    return this.feedService.createFeed(req.user, feed);
  }

  @Get()
  findAllFeed() {
    return this.feedService.findAllFeed();
  }

  @Get('sortBy')
  findBySort(@Query('take') take: number = 1, @Query('skip') skip: number = 1) {
    take = take > 20 ? 20 : take;
    return this.feedService.findBySort(take, skip);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put('update/:id')
  updatedFeed(@Param('id') id: string, @Body() updatedFeed: Feed) {
    return this.feedService.updatedFeed(id, updatedFeed);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete('delete/:id')
  deleteFeed(@Param('id') id: string) {
    return this.feedService.deleteFeed(id);
  }
}
