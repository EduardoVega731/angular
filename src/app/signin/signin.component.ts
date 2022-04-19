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
  public myList = [] as any;

  getText() {
    console.log(this.myList);
    let x: any = <HTMLInputElement>document.getElementById("item");
    x = x.value;
    // when submit, pushes input to array myList
    this.myList.push({ name: x, done: false });

    this.saveItem();
    this.loadItem();
    this.showList();
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
    this.loadItem();
    // showList();

  }

  
  loadItem() {
    const a: any = localStorage.getItem('TODO');
    let b = JSON.parse(a);
    if (b == null) b = [];
    this.myList = b;

    this.showList();
  }
  showList() {
    let ol: any = document.getElementById("show")
    let h = '';
    if (this.myList && this.myList.length) {
      h = '<ol>\r\n';

      for (let i: number = 0; i < this.myList.length; i++) {
        let li = this.myList[i];
        h +=
          `<li class="text" style="color:${li.done ? "green" : "red"}; text-decoration: ${li.done ? "line-through" : "none"};"> <input class="todo-item" type="checkbox" id="don-btn" 
          (click)="doneItem(${i})" ${li.done ? "checked" : ""}>`
          + li.name +
          `<span class="del-btn" (click)="console.log(this);delItem(${1})">&#9003</span>
          </li> `;
      }
      h += `</ol>`;
      ol.innerHTML = h;
    } else {
      ol.innerHTML = '';
    }
  }

  doneItem(index: any) {
    let text: any = <HTMLElement><unknown>document.getElementsByClassName("text");
    let checkboxes: any = <HTMLInputElement><unknown>document.getElementsByClassName('todo-item')
    // https://www.designcise.com/web/tutorial/how-to-toggle-a-checkbox-using-javascript
    this.myList[index].done = checkboxes[index].checked

    // condition ? true : false
    text[index].style.color = checkboxes[index].checked ? "green" : "red";
    text[index].style.textDecoration = checkboxes[index].checked ? "line-through" : "none";
    // https://stackoverflow.com/questions/32906887/remove-all-falsy-values-from-an-array
    //let d: any = <HTMLInputElement><unknown>document.getElementById("done-count").innerHTML = myList.filter((item: { done: any; }) => item.done).length
    this.saveItem();
  }
  delItem(index: any) {
    this.myList.splice(index, 1);
    alert("Are you sure you want to delete this?");

    this.saveItem();
    this.loadItem();
    this.showList();
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
