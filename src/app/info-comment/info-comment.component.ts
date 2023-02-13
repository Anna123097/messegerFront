import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-comment',
  templateUrl: './info-comment.component.html',
  styleUrls: ['./info-comment.component.css']
})
export class InfoCommentComponent implements OnInit {
form:FormGroup = new FormGroup({
  comment: new FormControl(null)
})
  constructor() {
    
  }

  ngOnInit(): void {
  }

  update():void{
    console.log('start')
  }

}
