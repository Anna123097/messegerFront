import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-info-photo-profile',
  templateUrl: './info-photo-profile.component.html',
  styleUrls: ['./info-photo-profile.component.css']
})
export class InfoPhotoProfileComponent implements OnInit {
  id:any;
  baseurl = environment.apiUrl;
  photo:any;
  comments:any=[]
  token:any
  message:any
  form:FormGroup = new FormGroup({
    comment:new FormControl(null)
  })
  constructor(private router: ActivatedRoute, public api:UserService) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id')
    this.token = localStorage.getItem("my-token");
    this.getProfilePhotoToId(this.id)
    this.getListCommentToProfilePhoto(this.id)
  }
  
  getProfilePhotoToId = (id:string) => {
    this.api.getProfilePhotoToId(id).subscribe(
      data => {
        console.log(data);
        this.photo = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  getListCommentToProfilePhoto = (id:string) => {
    this.api.getListCommentToProfilePhoto(id).subscribe(
      data => {
        console.log(data);
        this.comments = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  createCommentProfilePhoto = (photo: string, comment: string, token:string) => {
    this.api.createCommentProfilePhoto(photo, comment, token).subscribe(
      data => {
        console.log(data);
        this.getListCommentToProfilePhoto(this.id)
      },
      error => {
        console.log(error);
      }
    );
  }



  deleteCommentProfilePhoto = (id: string, token:string) => {
    this.api.deleteCommentProfilePhoto(id, token).subscribe(
      data => {
        console.log(data);
        this.getListCommentToProfilePhoto(this.id)
        if(data == "now permition"){
          this.message = "error delete comment"
        }
        else{
          this.message=""
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  sendComment():void{
    console.log(this.form.value)
    this.createCommentProfilePhoto(this.id , this.form.value.comment , this.token)
  }
  deleteComment(item:any):void{
    this.deleteCommentProfilePhoto(item.id, this.token)
  }
  updateComment(item:any):void{
    console.log("update")
  }

}


