
import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
// import{NavbarComponent} from './navbar.component';
import { AdunitService } from "./adunit.service";
import { CookieService } from 'ngx-cookie-service';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  login ='login';
  message ='mesaj';

  cookieHeader: string;
  constructor(private cookieService: CookieService,private _loadingBar: SlimLoadingBarService, private _router: Router,private data: AdunitService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  cookieValue = 'UNKNOWN';


  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
  navbarOpen = false;

   toggleNavbar() {
     this.navbarOpen = !this.navbarOpen;
   }
   ngOnInit() {
      this.cookieValue = this.cookieService.get('username');


  console.log('app componentte cookie uzunluğu '+this.cookieValue.length);
  if (this.cookieValue.length==0)
  {
    this.login = 'login';
       this.cookieValue='';
    this.cookieHeader='';

  }else{
    this.login = 'logout';

     this.cookieValue=this.cookieService.get('username');
    this.cookieHeader='Username : ';
  }

   }
}
