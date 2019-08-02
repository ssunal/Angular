import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { OtherpageRoutingModule } from "./otherpage-routing.module";
import { OtherpageComponent } from "./otherpage.component";

@NgModule({
    imports: [
        NativeScriptModule,
        OtherpageRoutingModule
    ],
    declarations: [
        OtherpageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OtherpageModule { }
