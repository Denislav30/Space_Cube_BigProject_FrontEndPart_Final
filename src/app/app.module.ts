import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button'; 

import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ButtonModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }