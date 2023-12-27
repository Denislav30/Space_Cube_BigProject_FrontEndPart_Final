// course.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courseName: string = '';
  startDate: string = '';
  endDate: string = '';

  addCourse() {
    // Implement logic to send data to the backend (via HTTP service)
    console.log('Course added:', this.courseName, this.startDate, this.endDate);
  }
}