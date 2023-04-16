import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Role } from '../user/role.enum';
import { UserService } from '../user/user.service';

@Component({
  selector: 'lha-app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  createUserAccountForm: FormGroup;
  usernameControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  passwordRepeatedControl = new FormControl('');
  roleControl = new FormControl('');
  activatedControl = new FormControl(false);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createUserAccountForm = formBuilder.group({});
  }

  clickCreateUser() {
    if (
      this.usernameControl.valid &&
      this.emailControl.valid &&
      this.roleControl.valid &&
      this.activatedControl.valid &&
      this.passwordControl.valid &&
      this.passwordRepeatedControl.valid &&
      this.passwordControl.value &&
      this.passwordControl.value === this.passwordRepeatedControl.value
    ) {
      const pass = CryptoJS.SHA256(this.passwordControl.value).toString(
        CryptoJS.enc.Base64,
      );
      const roles = [Role.User];
      if (this.roleControl.value === 'Admin') {
        roles.push(Role.Admin);
      }
      if(this.usernameControl.value && this.emailControl.value && this.activatedControl.value) {
        this.userService
        .createUser(
          this.usernameControl.value,
          this.emailControl.value,
          pass,
          roles,
          this.activatedControl.value,
        )
        .subscribe((result: any) => {
          if (result && result.created && result.created === true) {
            this.router.navigate(['admin/user']);
          }
        });
      }

    }
  }
}
