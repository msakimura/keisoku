import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";

import { SpinnerdialogComponent } from '../../shared/spinnerdialog/spinnerdialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  returnUrl: string;
  error = '';

  userid: string;
  password: string;

  useridFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  dialogRef: MatDialogRef<SpinnerdialogComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<LoginDialogComponent>,
    private dialog: MatDialog) { }

  ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  async onLogin() {

    // stop here if form is invalid
    if (this.useridFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    await this.showProgressSpinner();

    await this.delay(500);

    await this.oAuth();

    await this.closeProgressSpinner();

    this.gyoumuJump();
  }

  async oAuth() {
    this.authenticationService.login(this.userid, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });

  }

  async showProgressSpinner() {
    this.dialogRef = this.dialog.open(SpinnerdialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

  }

  async closeProgressSpinner() {
    this.dialogRef.close();

  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  gyoumuJump() {
    if (!this.error) {
      this.router.navigate(["/gyoumu"]);
    }
    
  }
}
