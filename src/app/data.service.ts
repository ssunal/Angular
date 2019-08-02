import {Injectable} from'@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable ()
export class DataService {

  private messageSource= new BehaviorSubject<string>('default message');
  private messageLoginSource= new BehaviorSubject<string>('login');
  currentMessage= this.messageSource.asObservable();
  currentLoginMessage= this.messageLoginSource.asObservable();
  constructor(){}
  changeMessage(message:string) {
    this.messageSource.next(message)
  }
  changeLoginMessage(message:string) {
    this.messageLoginSource.next(message)
  }
}
