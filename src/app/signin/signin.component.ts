import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { checkActionCode } from 'firebase/auth';
import { getLocaleDateTimeFormat } from '@angular/common';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService) { }



  ngOnInit() /*void*/ {
    this.loadItem();
    let d: any = <HTMLElement><unknown>document.getElementById("todo-count");
    d.innerHTML = this.myList.length;
  }
  public myList = [] as any;
  public check = [] as any;

  getText() {
    console.log(this.myList);
    let x: any = <HTMLInputElement>document.getElementById("item");
    x = x.value;
    // when submit, pushes input to array myList
    this.myList.push({ name: x, done: false });


    this.saveItem();
    this.loadItem();

    console.log(this.myList.length);


  }

  saveItem() {
    const a = JSON.stringify(this.myList);
    localStorage.setItem('TODO', a);
    let d: any = <HTMLElement><unknown>document.getElementById("todo-count");
    d.innerHTML = this.myList.length;
    // setData(DB_PATH + DEFAULT_TODO, this.myList);
  }
  // clears entire list
  clearAll() {
    if (confirm('Are you sure you want to delete this?')){
      while (this.myList.length > 0) {
        this.myList.pop();
      }
      }
      console.log("clear all button");
      let d: any = <HTMLElement><unknown>document.getElementById("done-count"); d.innerHTML = this.myList.filter((item: { done: any; }) => item.done).length
      this.saveItem();
      this.loadItem();


    }


    loadItem() {
      const a: any = localStorage.getItem('TODO');
      let b = JSON.parse(a);
      if (b == null) b = [];
      this.myList = b;
    
    }


    doneItem(index: any) {

      let text: any = <HTMLElement><unknown>document.getElementsByClassName("text");
      const checkboxes: any = document.getElementsByClassName('todo-item') as HTMLCollection | null;
      // https://www.designcise.com/web/tutorial/how-to-toggle-a-checkbox-using-javascript
      if (checkboxes[index].checked == true) {
        this.myList[index].done = true
      }
      if (checkboxes[index].checked == false) {
        this.myList[index].done = false
      }

      // condition ? true : false
      //text[index].style.color = checkboxes[index].checked ? "green" : "red";
      //text[index].style.textDecoration = checkboxes[index].checked ? "line-through" : "none";
      // https://stackoverflow.com/questions/32906887/remove-all-falsy-values-from-an-array
      let d: any = <HTMLElement><unknown>document.getElementById("done-count"); d.innerHTML = this.myList.filter((item: { done: any; }) => item.done).length

      this.saveItem();
    }

    delItem(index: any) {
      if (confirm('Are you sure you want to delete this?')) {
        this.myList.splice(index, 1);
      }
      let d: any = <HTMLElement><unknown>document.getElementById("done-count"); d.innerHTML = this.myList.filter((item: { done: any; }) => item.done).length

      this.saveItem();
      this.loadItem();

    }

  //   window.onload = function(){
  //     this.loadItem();
  // };
  
  
    
  }