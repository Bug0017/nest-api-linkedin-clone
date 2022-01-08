import { FeedEntity } from './models/feed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controller';

@Module({
 imports:[
    TypeOrmModule.forFeature([FeedEntity])
 ],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
