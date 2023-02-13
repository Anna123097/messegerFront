import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  massege:any;
  
  login_form:FormGroup = new FormGroup({
    password:new FormControl(null),
    username:new FormControl(null),
  })
  
  constructor(public api:UserService) {}

  ngOnInit(): void {
  }


  getToken = (username:string,password:string) => {
    this.api.getToken(username,password).subscribe(
      data => {
        localStorage.setItem("my-token",data.auth_token)
        console.log(data);
        window.location.href = "/profile"
      },
      error => {
        console.log(error);
        this.massege = "Проверьте правильность полей";
      }
    );
  }

  login_user():void {
    this.getToken(this.login_form.value.username,this.login_form.value.password)

  }
}
