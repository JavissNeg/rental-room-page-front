import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm!: FormGroup;

    constructor() {
    }

    ngOnInit(): void {

        this.registerForm = new FormGroup({
            'firstName': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-zA-Z]+$/)
                ]
            ),
            'paternalSurname': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(15),
                    Validators.pattern(/^[a-zA-Z]+$/)
                ]
            ),
            'maternalSurname': new FormControl( 
                null, 
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(15),
                    Validators.pattern(/^[a-zA-Z]+$/)
                ]
            ),
            'mail': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.email
                ]
            ),
            'phone': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                    Validators.pattern(/^[0-9]+$/)
                ]
            ),
            'username': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(15),
                    Validators.pattern(/^[a-zA-Z0-9]+$/)
                ]
            ),
            'password': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-zA-Z0-9]+$/)
                ]
            ),
            'confirmPassword': new FormControl(
                null, 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(20),
                    Validators.pattern(/^[a-zA-Z0-9]+$/)
                ]
            )
        });

    }

    onSubmit() {
        console.log(this.registerForm.value);
    }
}
