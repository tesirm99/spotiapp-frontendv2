import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {

  }

  async login(email: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    let res2 = await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log(res2);
    
    if(res.status == 200 && res2.user) {

      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      this.isLoggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }


  async register(email: string, password: string): Promise<boolean> {
    let res = await fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let res2 = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log(res2);

    if(res.status == 200 && res2.user) {
      let accessInfo = await res.json();
      localStorage.setItem('token', accessInfo.token);
      localStorage.setItem('id', accessInfo.id);
      this.isLoggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.isLoggedIn.next(false);
  }

  isLogged() {
    if(localStorage.getItem('token')) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
    return this.isLoggedIn.asObservable();
  }

  async getUser(): Promise<string> {
    let userId = localStorage.getItem('id');
    
    return userId ? userId : 'Anonymous';

  }
}
