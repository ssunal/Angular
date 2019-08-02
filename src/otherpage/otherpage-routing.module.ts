import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OtherpageComponent } from "./otherpage.component";

const routes: Routes = [
    { path: "", component: OtherpageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OtherpageRoutingModule { }
