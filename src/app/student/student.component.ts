import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Course, StudentCourse } from '../../interfaces/CourseInterface';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  birthDate: string | Date = '';
  studentCourse: any;
  courses: Course[] = [];
  students?:any[];
  formErrors: { [key: string]: string } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  addStudent() {
    const formValidation = this.isFormValid();
    if (!formValidation.isValid) {
      console.error('Invalid data for student!');
      this.formErrors = formValidation.errors;
      return;
    }
    console.log(this.studentCourse);
    
    this.apiService.getCourseByName(this.studentCourse.courseName).subscribe(
      (findedCourse:Course) => {
        if (findedCourse !== null) {
          this.apiService.addStudent({
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            course: findedCourse 
          }).subscribe(
            (response) => {
              if (response !== null) {
                console.log('Student, successfully added!', response);
                this.loadStudents();
                this.clearInputFields();
                this.formErrors = {}; 
              } else {
                console.error('Error: Invalid course identifier.');
                console.log(findedCourse);
              }
            },
            (error) => {
              console.error('Error: Adding student.', error);
            }
          );
        } else {
          console.error('Error: Invalid course identifier.');
        }
      },
      (error) => {
        console.error('Error: retrieving course id', error);
      }
    );
  }

  private isFormValid(): { isValid: boolean; errors: { [key: string]: string } } {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    if (!this.firstName) {
      errors['firstName'] = 'First name is required!';
      isValid = false;
    }

    if (!this.lastName) {
      errors['lastName'] = 'Last name is required!';
      isValid = false;
    }

    if (!this.birthDate) {
      errors['birthDate'] = 'Date of birth is required!';
      isValid = false;
    }

    return { isValid, errors };
  }

  private loadStudents() {
    this.apiService.getStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error: Retrieving students!', error);
      }
    );
  }

  private loadCourses() {
    this.apiService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error: Retrieving courses!', error);
      }
    );
  }

  private clearInputFields() {
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
  }
}