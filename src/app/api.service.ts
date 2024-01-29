import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';
import { Course } from '../interfaces/CourseInterface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/courses`);
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/students`);
  }
  
  getCourseById(id:Number):Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/api/courses${id}`);
  }

  addCourse(courseData: { courseName: string, startDate: string, endDate: string }): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<void>(`${this.baseUrl}/api/courses`, courseData, { headers });
  }

  addStudent(studentData: { firstName: string, lastName: string, course: Course, birthDate: string | Date }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (studentData.birthDate instanceof Date) {
      studentData.birthDate = this.formatDate(studentData.birthDate);
    }

    const observable = this.http.post<void | null>(`${this.baseUrl}/api/students`, studentData, { headers })
      .pipe(
        filter(response => response !== null), 
        tap(response => console.log('Student successfully added!', response)),
        catchError(error => {
          console.error('Error adding student!', error);
          return of(null);
        })
      );

    return observable;
  }

  getAllCourseNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/course-names`);
  }

  getCourseByName(courseName: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/api/get-course-by-name/${courseName}`);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}