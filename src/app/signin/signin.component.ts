import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

 


  constructor(public authService: AuthService) { }

  

  ngOnInit() /*void*/ {
  }
  public myList=[] as any;

  getText(){
    console.log(this.myList);
    let x : any = <HTMLInputElement>document.getElementById("item");
    x = x.value;
    // when submit, pushes input to array myList
    this.myList.push({ name: x, done: false });

    this.saveItem();
  }

  saveItem() {
    const a = JSON.stringify(this.myList);
    localStorage.setItem('TODO', a);
    // setData(DB_PATH + DEFAULT_TODO, this.myList);
}
  // clears entire list
  clearAll() {
  while (this.myList.length > 0) {
      this.myList.pop();
  }
  console.log("clear all button");

  this.saveItem();
  // loadItem();
  // showList();

}

}

// import { Component } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div *ngIf="auth.user | async as user; else showLogin">
//       <h1>{{ user.displayName }}</h1>
//       <button (click)="logout()">Logout</button>
//     </div>
//     <ng-template #showLogin>
//       <p>Please login.</p>
//       <button (click)="login()">Login with Google</button>
//     </ng-template>
//   `,
// })
// export class AppComponent {
//   constructor(public auth: AngularFireAuth) {
//   }
//   login() {
//     this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//   }
//   logout() {
//     this.auth.signOut();
//   }
// }