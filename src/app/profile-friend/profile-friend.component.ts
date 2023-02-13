import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-friend',
  templateUrl: './profile-friend.component.html',
  styleUrls: ['./profile-friend.component.css']
})
export class ProfileFriendComponent implements OnInit {
  id:any;
  profile:any;
  messege:any;
  token:any;
  myFriend:any;
  photos:any = [];

  baseurl = environment.apiUrl;


  constructor(private router: ActivatedRoute, public api:UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("my-token");
    this.id=this.router.snapshot.paramMap.get('id')
    this.getProfileToUser(this.id)
    this.checkMyFriend(this.id,this.token)
    this.getListProfilePhotosToUserId(this.token, this.id)
  }



  createFriend = (friend:string,token:string) => {
    this.api.createFriend(friend, token).subscribe(
      data => {
        this.messege="Successfully added !!!"
      },
      error => {
        this.messege=error.error
      }
    );
  }

  getListProfilePhotosToUserId = (token:string, id:string) => {
    this.api.getListProfilePhotosToUserId(token, id).subscribe(
      data => {
        console.log(data)
        this.photos = data
      },
      error => {
        this.messege=error.error
      }
    );
  }


createMyFriend(item:any):void{
  this.createFriend(item.id, this.token);
  console.log("start")
}



  getProfileToUser = (id:string) => {
    this.api.getProfileToUser(id).subscribe(
      data => {
        console.log(data);
        this.profile = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  checkMyFriend = (friend:string,Token:string) => {
    this.api.checkMyFriend(friend, Token).subscribe(
      data => {
        console.log(data);
        this.myFriend = data;
      },
      error => {
        console.log(error);
      }
    );
  }



  deleteMyFriend = (friend:string,Token:string) => {
    this.api.deleteMyFriend(friend, Token).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
      }
    );
  }

  delete():void{
    this.deleteMyFriend(this.id, this.token);
  }


}
