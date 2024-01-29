import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  courseData = {
    courseName: '',
    startDate: null,
    endDate: null
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  addCourse() {
    if (!this.courseData.courseName || !this.courseData.startDate || !this.courseData.endDate) {
      console.error('Course name, start date, and end date are required');
      return;
    }
    const startDateObj = new Date(this.courseData.startDate);
    const endDateObj = new Date(this.courseData.endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      console.error('Invalid date format');
      return;
    }

    const formattedStartDate = this.formatDate(startDateObj);
    const formattedEndDate = this.formatDate(endDateObj);

    if (!this.courseData.courseName.trim()) {
      console.error('Course name must not be empty');
      return;
    }

    console.log('Sending course data to the server:', this.courseData);

    this.apiService.addCourse({
      courseName: this.courseData.courseName,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    })
    .subscribe(
      () => {
        console.log('Course added successfully:', this.courseData.courseName);

        this.apiService.getCourses().subscribe(
          (courses) => {
            this.courses = courses;
          },
          (error) => {
            console.error('Error fetching courses:', error);
          }
        );
      },
      (error) => {
        console.error('Error adding course:', error);
      }
    );

    this.courseData = {
      courseName: '',
      startDate: null,
      endDate: null
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}