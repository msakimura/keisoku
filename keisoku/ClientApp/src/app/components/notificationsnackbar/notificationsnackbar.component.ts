import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-notificationsnackbar',
  templateUrl: './notificationsnackbar.component.html',
  styleUrls: ['./notificationsnackbar.component.css']
})
export class NotificationsnackbarComponent implements OnInit {

  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {

    this.message = this.data.message;
  }

}
