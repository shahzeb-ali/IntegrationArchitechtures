import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/Employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
  headers = ["employee_id", "firs_name", "last_name", "department", "bonus"];
  constructor(private empService:EmployeeService) {
  }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe((res)=>{
    this.employees=res;
    })
  }

}
