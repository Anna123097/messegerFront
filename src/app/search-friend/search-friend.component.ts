import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
  token:any;
  messege:any;
  friends:any=[];
  form:FormGroup = new FormGroup({
    search:new FormControl(null)
  });
  constructor(public api:UserService, private elRef: ElementRef) { }
  ngOnInit(): void {
    this.token = localStorage.getItem("my-token");
  }


  searsh_friend():void{
    this.getSearchFriends(this.form.value.search)
  }


  getSearchFriends = (search:string) => {
    this.api.getSearchFriends(search).subscribe(
      data => {
        console.log(data);
        this.friends = data;
        this.elRef.nativeElement.blur();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
      }
      },
      error => {
        console.log(error);
      }
    );
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
createMyFriend(item:any):void{
  this.createFriend(item.id, this.token);
}


}
