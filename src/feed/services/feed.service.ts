import { User } from 'src/auth/models/user.interface';
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

  createFeed(user:User,feed:Feed): Observable<Feed>{
    return from(this.feedRepository.save({...feed, author: user}));
  }


  findAllFeed(): Observable<Feed[]>{
    return from(this.feedRepository.find());
  }

  findBySort(take:number =10, skip:number=0){
    return from(this.feedRepository.findAndCount({take,skip}).then(([feeds])=>{
      return <Feed[]>feeds
    }))
  }
  updatedFeed(id:string, updateFeed:Feed): Observable<UpdateResult>{
      return from(this.feedRepository.update(id, updateFeed))
  }

  deleteFeed(id:string): Observable<DeleteResult>{
    return from(this.feedRepository.delete(id));
  }
}
