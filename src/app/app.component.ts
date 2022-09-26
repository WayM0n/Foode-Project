import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FoodE';
  activeId=1;
  constructor( private authService: AuthService, ){ }
  ngOnInit(): void {
      this.authService.autoLogin();

  }
}
