import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gyoumu-header',
  templateUrl: './gyoumu-header.component.html',
  styleUrls: ['./gyoumu-header.component.css']
})
export class GyoumuHeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  baseJump() {
    this.router.navigate(["/"]);
  }
}
