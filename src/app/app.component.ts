import { Component, OnInit, VERSION } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './models/user';
import { AppContext } from './services/app-context.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private appContext: AppContext,
    private auth: AuthService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.validateUser();
  }

  validateUser() {
    // console.log(this.auth.isAuthenticated());
    this.appContext.setAuthenticated(this.auth.isAuthenticated());
    this.appContext.isAuthenticated$
      .pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.user.getDetails();
          }
          return of(null);
        })
      )
      .subscribe((user: User | null) => {
        if (Boolean(user)) {
          this.appContext.setUser(user);
        }
      });
  }
}
