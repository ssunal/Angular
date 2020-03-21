import { Component, OnInit } from '@angular/core';
import {Uspass} from "../../../models/uspass";

@Component({
  selector: 'app-listuspass',
  templateUrl: './listuspass.component.html',
  styleUrls: ['./listuspass.component.css']
})
export class ListuspassComponent implements OnInit {
  uspasses: Uspass[] =[{username:"sinek",mail:"ssunal@52linesofcode.uk",password:"cemoss"},{username:"sineka",mail:"ssunal@52linesofcode.co.uk",password:"cemoc"}];
  constructor() { }

  ngOnInit() {
  }

}
