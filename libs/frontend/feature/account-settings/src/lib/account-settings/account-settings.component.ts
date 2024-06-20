import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { AccountService } from '@lighthouse-automation/frontend/data-access/account';

@Component({
  selector: 'lha-frontend-feature-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  account: any;
  showChangePasswordForm = false;
  changePasswordForm: FormGroup;
  passwordControl = new FormControl('');
  passwordRepeatedControl = new FormControl('');

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {
    this.changePasswordForm = formBuilder.group({});
  }

  ngOnInit() {
    this.accountService.getAccount().subscribe((account: any) => {
      this.account = account;
    });
  }

  displayChangePasswordForm() {
    this.showChangePasswordForm = true;
  }

  saveNewPassword() {
    if (
      this.passwordControl.valid &&
      this.passwordRepeatedControl.valid &&
      this.passwordControl.value &&
      this.passwordControl.value === this.passwordRepeatedControl.value
    ) {
      const pass = CryptoJS.SHA256(this.passwordControl.value).toString(
        CryptoJS.enc.Base64,
      );
      this.accountService
        .changePassword(pass)
        .subscribe((result: any) => {
          if (result && result.changed && result.changed === true) {
            this.showChangePasswordForm = false;
            this.passwordControl.setValue('');
            this.passwordRepeatedControl.setValue('');
          }
        });
    }
  }

  cancle() {
    this.showChangePasswordForm = false;
  }
}
