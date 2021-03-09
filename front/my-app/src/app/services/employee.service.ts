import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from "../models/Employee";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeURL: string = "http://192.168.178.47:9000/salesman";

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeURL);
  }
}
