import { NgModule } from "@angular/core";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [MatToolbarModule, MatButtonModule, MatInputModule],
    exports: [MatToolbarModule, MatButtonModule, MatInputModule]
})
export class MyCustomMaterialModule { }