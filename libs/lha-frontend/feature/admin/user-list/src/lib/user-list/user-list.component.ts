import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'lha-app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnChanges {
  userList: any;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((result: any) => {
      this.userList = result;
    });
  }

  ngOnChanges() {
    this.userService.getUsers().subscribe((result: any) => {
      this.userList = result;
    });
  }

  selectUser(user: any) {}
}
