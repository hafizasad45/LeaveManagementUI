import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  instituteForm!: FormGroup;

  constructor(private fb: FormBuilder ) {}

  
  ngOnInit(): void {
    this.instituteForm = this.fb.group({
      instituteCode: ['', Validators.required],
      instituteName: ['', Validators.required],
      description: [''],
      active : [true]
    });
  }

}
