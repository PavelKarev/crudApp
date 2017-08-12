import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user/user.service';

import { User } from '.././user';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  newUser = new User();
  @Output() createNewUserEvent = new EventEmitter();

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  create() {
    // call server to save
    this.createNewUserEvent.emit(this.newUser);
    this.newUser = new User();
  }
}
