    import { Component, OnInit } from '@angular/core';
    import { CookieService } from 'ngx-cookie-service';
    import {AdunitService} from "../adunit.service";
    import {AppComponent} from "../app.component";

      @Component({
        selector: 'app-logout',
        template: `
          {{logout}}

        `
          // <button (click)="newMessage()">New Message</button>
      })
      export class LogOutComponent implements OnInit {
        cookieValue = 'UNKNOWN';
        login: string='logout';
        logout:string='kdjaksjaskldjaksldjl';
      constructor(private cookieService: CookieService,
                  private adunitservice: AdunitService,
                  private app: AppComponent
                  ) { }

  ngOnInit()  {

    this.logout='Please come back!';

    this.cookieService.deleteAll();
    this.login='logout';
    this.app.cookieValue='';
    this.app.cookieHeader='';
    this.app.login='login';

    }
}
