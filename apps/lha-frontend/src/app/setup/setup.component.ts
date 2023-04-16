import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { SetupService } from './setup.service';

@Component({
  selector: 'lha-app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  createFirstAdminForm: FormGroup;
  usernameControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  passwordRepeatedControl = new FormControl('');

  constructor(
    private setupService: SetupService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createFirstAdminForm = formBuilder.group({});
  }

  clickCreateFirstAdmin() {
    if (
      this.usernameControl.valid &&
      this.emailControl.valid &&
      this.passwordControl.valid &&
      this.passwordRepeatedControl.valid &&
      this.passwordControl.value === this.passwordRepeatedControl.value
    ) {
      if (this.usernameControl.value && this.emailControl.value && this.passwordControl.value) {
        const pass = CryptoJS.SHA256(this.passwordControl.value).toString(
          CryptoJS.enc.Base64,
        );
        this.setupService
          .createFirstAdminUser(
            this.usernameControl.value,
            this.emailControl.value,
            pass,
          )
          .subscribe((result: any) => {
            if (result && result.success && result.success === true) {
              this.router.navigate(['login']);
            }
          });
      }

    }
  }
}
