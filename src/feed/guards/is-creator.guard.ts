import { Feed } from './../models/feed.interface';
import { User } from './../../auth/models/user.interface';
import { FeedService } from './../services/feed.service';
import { AuthService } from './../../auth/services/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, switchMap, map } from 'rxjs';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private feedService: FeedService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params }: { user: User; params: { id: string } } = context
      .switchToHttp()
      .getRequest();
    if (!user || !params) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    const userId = user.id,
      feedId = params.id;

    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) => {
        return this.feedService.findFeedById(feedId).pipe(
          map((feed: Feed) => {
            let isAuthor = user.id === feed.author.id;
            return isAuthor;
          }),
        );
      }),
    );
  }
}
