import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration_form:FormGroup = new FormGroup({
    username:new FormControl(null),
    password:new FormControl(null),
    email:new FormControl(null)
  })
  massege:any;
  constructor(public api:UserService) {

   }

  ngOnInit(): void {
  }

  registration = (username:string,password:string,email:string) => {
    this.api.registration(username,password,email).subscribe(
      data => {
        console.log(data);
        window.location.href = "/login";
      },
      error => {
        console.log(error);
        this.massege = "Проверте правильность полей";
      }
    );
  }
  registrationUser():void {
    this.registration(this.registration_form.value.username,this.registration_form.value.password,this.registration_form.value.email)

  }
}
