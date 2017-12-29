import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../models/profile';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase) {
  }

  public getAuthState(): Observable<User> {
    return this.afAuth.authState as Observable<User>;
  }

  public getAuthUid(): string {
    return this.afAuth.auth.currentUser.uid as string;
  }

  public updateAuthEmail(email: string): Promise<void> {
    return this.afAuth.auth.currentUser.updateEmail(email) as Promise<void>;
  }

  // public updateAuthPhotoURL(photoURL: string): Promise<void> {
  //   return this.afAuth.auth.currentUser.updateProfile(null, photoURL) as Promise<void>;
  // }

  public login(email: string, password: string): Promise<Profile> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(async (user) => {
      // if (!user.emailVerified) {
      //   await this.afAuth.auth.signOut();
      //   return Promise.reject('Bevor Sie sich einloggen, bestätigen Sie die Verifizierung in der Email.');
      // }

      return this.afDb.object(`/profiles/${user.uid}`).first().toPromise();
    }) as Promise<any>;
  }

  public register(email: string, password: string): Promise<Profile> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (user) => {
      return this.afDb.object(`/profiles/${user.uid}`).first().toPromise();
    }) as Promise<any>;
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut() as Promise<void>;
  }

}
