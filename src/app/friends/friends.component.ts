import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  token:any;
  friends:any = [];
  baseurl = environment.apiUrl;
  constructor(public api:UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('my-token')
    this.getListAllMyFriend(this.token)
  }
  
  getListAllMyFriend = (token:string) => {
    this.api.getListAllMyFriend(token).subscribe(
      data => {
        console.log(data);
        this.friends = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  
  deleteFriend = (id:string, token:string) => {
    this.api.deleteFriend(id, token).subscribe(
      data => {
        console.log(data);
        this.getListAllMyFriend(this.token);
      },
      error => {
        console.log(error);
      }
    );
  }

  update(id:string):void{
    this.deleteFriend(id,this.token);
  }

}
