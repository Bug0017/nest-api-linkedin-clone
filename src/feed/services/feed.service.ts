import { Feed } from './../models/feed.interface';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../models/feed.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  createFeed(feed:Feed): Observable<Feed>{
    return from(this.feedRepository.save(feed));
  }


  findAllFeed(): Observable<Feed[]>{
    return from(this.feedRepository.find());
  }

  updatedFeed(id:string, updateFeed:Feed): Observable<UpdateResult>{
      return from(this.feedRepository.update(id, updateFeed))
  }

  deleteFeed(id:string): Observable<DeleteResult>{
    return from(this.feedRepository.delete(id));
  }
}
