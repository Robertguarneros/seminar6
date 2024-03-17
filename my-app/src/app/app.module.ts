import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
