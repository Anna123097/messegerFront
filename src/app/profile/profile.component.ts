import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  update_form:FormGroup = new FormGroup({
    phone:new FormControl(null),
    nikname:new FormControl(null),
    status: new FormControl(null),
    adress: new FormControl(null)
  })
  baseurl = environment.apiUrl;
  // @ts-ignore
  fileToUpload: File = null;

  // @ts-ignore
  fileToUploadProfile: File = null;

  imageUrl = '';
  imageUrlProfile = "";
  photos:any =[];
  constructor(public api:UserService) {
    
  }
  token:any;
  profile:any;
  ngOnInit(): void {
    this.token = localStorage.getItem("my-token");
    this.getProfileToToken(this.token);
    this.getListProfilePhotosToUser(this.token);
  }

  getProfileToToken = (token:string) => {
    this.api.getProfileToToken(token).subscribe(
      data => {
        console.log(data);
        this.profile = data
        this.update_form.patchValue({
          phone:data.phone,
          nikname:data.nickname,
          status:data.status,
          adress:data.address
        })

      },
      error => {
        console.log(error);
      }
    );
  }

  patchProfileToToken = (token:string,phone:string,nickname:string, status:string, adress:string, img:File) => {
    this.api.patchProfileToToken(token,phone,nickname, status, adress, img).subscribe(
      data => {
        console.log(data);
        this.getProfileToToken(this.token)
        
      },
      error => {
        console.log(error);
      }
    );
  }


  createProfilePhoto = (token:string, img:File) => {
    this.api.createProfilePhoto(token, img).subscribe(
      data => {
        console.log(data);       
        this.getListProfilePhotosToUser(this.token)
      },
      error => {
        console.log(error);
      }
    );
  }


  
  getListProfilePhotosToUser = (token:string) => {
    this.api.getListProfilePhotosToUser(token).subscribe(
      data => {
        console.log(data);
        this.photos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProfilePhoto = (token:string, id:string) => {
    this.api.deleteProfilePhoto(token, id).subscribe(
      data => {
        console.log(data);
        this.getListProfilePhotosToUser(this.token);
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePhoto(id:any):void{
    this.deleteProfilePhoto(this.token, id);
  }

savePhoto():void{
  console.log('start')
  this.createProfilePhoto(this.token, this.fileToUploadProfile);
}

  update():void{
    this.patchProfileToToken(this.token,this.update_form.value.phone,this.update_form.value.nikname, this.update_form.value.status, this.update_form.value.adress, this.fileToUpload);
  }

  handleFileInput(files: any): void {
    this.fileToUpload = files.files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  handleFileInputProfile(files: any): void {
    this.fileToUploadProfile = files.files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrlProfile = event.target.result;
    };
    reader.readAsDataURL(this.fileToUploadProfile);
  }

}
