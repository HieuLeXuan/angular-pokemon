import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard
  implements CanLoad, CanActivate, CanActivateChild
{
  constructor(private readonly router: Router, private auth: AuthService) {}

  canActivateChild() {
    return this.isAuth$();
  }

  canActivate() {
    return this.isAuth$();
  }

  canLoad() {
    return this.isAuth$();
  }

  private isAuth$() {
    return of(this.auth.isAuthenticated()).pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/not-auth']);
        }
      })
    );
  }
}
