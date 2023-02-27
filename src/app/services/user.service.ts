import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { StorageService, STORAGE_KEYS } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private storage: StorageService) {}

  getDetails(): Observable<User> {
    return of({
      name: 'Hieu',
      likes: 0,
      dislikes: 0,
      ...this.storage.get<User>(STORAGE_KEYS.USER),
    });
  }
}
