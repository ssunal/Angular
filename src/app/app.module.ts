import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoGeneratedComponent } from './auto-generated/auto-generated.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome.component';
import { CreateComponent } from './components/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { MessagesComponent } from './components/messages/messsages.component';
import { EditComponent } from './components/edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';
import { AdunitService } from './adunit.service';
import { DataService } from './data.service';
import {ListuspassComponent} from "./uspass/listuspass.component";
import {FooterComponent} from "./footer/footer.component";
import {ListpostsComponent} from "./posts/listposts.component";
import {LogOutComponent} from "./components/logout.component";
import {SignUpComponent} from "./components/signup.component";
import {LoggedInComponent} from "./components/loggedIn.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from "./pageNotFound.component";
import {MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatExpansionModule,MatIconModule,MatDatepickerModule,
  MatNativeDateModule  } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
const routes: Routes = [
  {path: "products", component: ListuspassComponent, outlet: "bottomFrame"},//
  {
    path: "",
    component: FooterComponent,
    outlet: "footer"
  },

  {path: 'login',component: LoginComponent},
  {path: 'uspassr',component: ListuspassComponent},
  {path: 'postsr',component: ListpostsComponent},
  {path: 'edit/:id_user',component: EditComponent},
  {path: 'welcome',component: WelcomeComponent},
  {path: 'logout',component: LogOutComponent},
  {path: 'index',component: IndexComponent},
  {path: 'create',component: CreateComponent},
  {path: 'messages',component: MessagesComponent},
  {path: 'signup',component: SignUpComponent},
  {path: 'logged-in',component: LoggedInComponent},

  {path:'', redirectTo: 'welcome',pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent},

  // {path:'', redirectTo: 'welcome',pathMatch:'full'},
  // {path:'', component:PageNotFoundComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    AutoGeneratedComponent,
    CreateComponent,
    LoginComponent,
    IndexComponent,
    EditComponent,
    MessagesComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    SignUpComponent,
    LoggedInComponent,
    LogOutComponent,
    ListuspassComponent,
    ListpostsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatAutocompleteModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule,MatExpansionModule,MatIconModule,MatDatepickerModule,
    MatNativeDateModule,

    AppRoutingModule
  ],
  providers: [ AdunitService,DataService, CookieService ], // Data service sadece mesajlaşma için var
  bootstrap: [AppComponent]

})
export class AppModule { }
