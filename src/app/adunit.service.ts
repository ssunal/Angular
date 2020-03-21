import {Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import {Uspass} from '../../models/uspass';
import { tap } from  'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AdunitService {
  cookieValue = 'UNKNOWN';
  //login:string;

  uri = 'http://192.168.0.4:4000/adunits';

  private messageSource= new BehaviorSubject<string>('');
  private messageLoginSource= new BehaviorSubject<string>('');
  private messageUsernameSource= new BehaviorSubject<string>('');
  private messagePageSource= new BehaviorSubject<string>('');
  authSubject  =  new  BehaviorSubject(false);
  currentMessage= this.messageSource.asObservable();
  currentLoginMessage= this.messageLoginSource.asObservable();
  currentPageMessage= this.messagePageSource.asObservable();
  currentUsernameMessage= this.messageUsernameSource.asObservable();



  constructor(private route: ActivatedRoute,
    private router: Router,
    private uspass: Uspass,

    private http: HttpClient,
              private cookieService: CookieService) { }

              getCookie() {
                  console.log('get cookie girdiiiiiiiiii');
                  return this
                         .http
                         .get(`${this.uri}/cookie`)
                         .subscribe(res => { this.changeLoginMessage('getcookie');
                           console.log('http getcookie hatasız yapıldı')});
              }
              setCookie(username) {
                console.log('set cookie girdi');
                const obj = {
                  username: username,

                };
                   this
                         .http
                         .post(`${this.uri}/setcookie`,obj)
                         .subscribe(res => { this.changeLoginMessage(username+': postcookie');
                           console.log('http poscookie hatasız yapıldı')});
              }
              addAdUnit(username, email, id_user) {
                   const obj = {
                     username: username,
                     email: email,
                    id_user:id_user
                   };
               return this
                         .http
                         .post(`${this.uri}/add`,obj)
                         .subscribe(res => {
                                            if(res==1){console.log('JSden dönüp servis içine gelen username:'+res );
                                          }
                                          });
             }
             apiChippers(writer,api){
                 const obj = {
                     writer:writer,
                     api:api
                 };

                    return this
                         .http
                             .get(`/api/json/posts/all/${obj.writer}/${obj.api}`)
                              ;


             }

    apiChippersLogin(uspass: Uspass,uri: string): Observable<Uspass> {
    console.log(this.uri);
      return this.http.post<Uspass>(uri+`/json/posts/login/`, uspass).pipe(
        tap((uspass:  Uspass ) => {
          console.log('servisten gelen  parametre '+
          JSON.stringify(uspass)+'jkjkj:'+ uspass.islogin);
          if (uspass.islogin) {
            console.log('içeride:'+uspass.islogin);
            //localStorage.set("ACCESS_TOKEN", uspass.auth_token);
            //localStorage.set("ISLOGIN", uspass.islogin);
           // this.authSubject.next(true);
          }
        })

      );
  }
    firstLogin(username, password, app)   {
    console.log('first logine buraya geldi');
        const obj = {
            username: username,
            password: password
        };
        console.log(`${this.uri}/login`);
        return this.http
            .post(`${this.uri}/login`,obj)

            // .subscribe(res => console.log('JSden dönüp servis içine gelen username:' + res[0].username));
            .subscribe(res => {
                if(res==1){console.log('JSden dönüp servis içine gelen kayıt yok :'+res );
                    this.changeMessage('username or password is wrong');
                    //this.changeLoginMessage('login');
                    //this.changeUsernameMessage(obj.username);
                    //this.changePageMessage('login');
                    this.cookieService.deleteAll();
                    app.login='login';
                    app.cookieHeader='';
                    //this.router.navigate(['login']);
                }
                else
                {
                  console.log('kayıt var sonuç geldi');
                    this.cookieService.set( 'username', username );
                    this.cookieValue = this.cookieService.get('username');
                      // console.log(  'cookie: '+this.cookieValue);
                    // this.changeMessage(username+': Loged in');
                    this.changeLoginMessage(this.cookieValue);
                    app.login='logout';
                    app.cookieHeader='Username : ';
                    app.cookieValue=this.cookieValue;
                    this.router.navigate(['logged-in']);
                }
            });
    }    isLogin(app) {
    console.log('loginmiymiş ');
        this.cookieValue = this.cookieService.get('username');
    console.log('cookie '+ this.cookieValue.length +this.cookieValue);


        if (this.cookieValue.length==0){
            app.login='login';
            console.log('loginmiş ')
            this.router.navigate(['login']);
        }
    }
             loginAdUnit(username, password)   {
                                    const obj = {
                                       username: username,
                                       password: password
                                     };
                                    return this.http
                                       .post(`${this.uri}/login`,obj)
                                       // .subscribe(res => console.log('JSden dönüp servis içine gelen username:' + res[0].username));
                                       .subscribe(res => {
                                                          if(res==1){console.log('JSden dönüp servis içine gelen username:'+res );
                                                          this.changeMessage('username or password is wrong');
                                                          this.changeLoginMessage('login');
                                                          this.changeUsernameMessage(obj.username);
                                                          this.changePageMessage('login');
                                                          this.cookieService.deleteAll();
                                                         // this.login='login';
                                                          this.router.navigate(['login']);
                                                        }
                                                          else
                                                        {
                                                            this.cookieService.set( 'username', username );
                                                            this.cookieValue = this.cookieService.get('username');
                                                           // console.log(  'cookie: '+this.cookieValue);
                                                           // this.changeMessage(username+': Loged in');
                                                            this.changeLoginMessage(this.cookieValue);
                                                           // this.changePageMessage('logout');
                                                           // this.login='logout';
                                                           // this.router.navigate(['logined-in']);
                                                          }
                                                          });
                                                 }
  //--------------------------------------------------
 editAdUnit(id_user) {
   console.log('edit servisin içinde bulunan id:'+id_user)
   return this
             .http
             .get(`${this.uri}/edit/${id_user}`);
   }
   indexAdUnits() {
     return this
               .http
               .get(`${this.uri}/index`);
     }
 deleteAdUnit(id_user) {
   console.log('delete/${id_user} yapmaya gidiyor '+id_user);
   // const obj = {
   //
   //   id_user:id_user
   // };
   this
     .http
     .get(`${this.uri}/delete/${id_user}`)
     .subscribe(res => console.log('Done'));
}
  updateAdUnit(username, email, id_user) {
    console.log('servis içindeki update çalıştı'+username+email+id_user);
    const obj = {
      username: username,
      email: email,
      id_user:id_user
    };
    this
      .http
      .post(`${this.uri}/update/${id_user}`, obj)
      .subscribe(res => console.log('Done'));
  }
  changeMessage(message:string) {
    this.messageSource.next(message)
  }
  changeLoginMessage(message:string) {
    this.messageLoginSource.next(message)
  }
    changePageMessage(message:string) {
        this.messagePageSource.next(message)
    }
    changeUsernameMessage(message:string) {
        this.messageUsernameSource.next(message)
    }

}
