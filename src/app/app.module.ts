import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCustomMaterialModule } from './custom.material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BookService } from './services/book.service';
import { UploadImageService } from './services/upload-image.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AddNewBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MyCustomMaterialModule,
    AppRoutingModule
  ],
  providers: [LoginService,
              BookService,
              UploadImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
