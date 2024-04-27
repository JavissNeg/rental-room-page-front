import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginPostRequestBody } from 'src/app/interfaces/login';
import { Router } from '@angular/router';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword ? null : { PasswordNoMatch: true };
};

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    animations: [
        trigger(
            'inputError', 
            [
                state(
                    'start', 
                    style(
                        {
                            backgroundColor: 'var(--input-bg)',
                        }
                    )
                ),
                state(
                    'end', 
                    style(
                        {
                            border: '2px red solid',
                            backgroundColor: 'var(--input-bg)',
                        }
                    )
                ),
                transition(
                    'start => end', 
                    [
                        animate(
                            '1s ease-in-out', 
                            keyframes(
                                [
                                    style({ transform: 'translateX(0)', offset: 0, backgroundColor: 'red' }),
                                    style({ transform: 'translateX(4px)', offset: 0.1 }),
                                    style({ transform: 'translateX(-4px)', offset: 0.2 }),
                                    style({ transform: 'translateX(0)', offset: 0.3 }),
                                    style({ transform: 'translateX(4px)', offset: 0.4 }),
                                    style({ transform: 'translateX(-4px)', offset: 0.5 }),
                                    style({ transform: 'translateX(0)', offset: 0.6 }),
                                    style({ transform: 'translateX(4px)', offset: 0.7 }),
                                    style({ transform: 'translateX(-4px)', offset: 0.8 }),
                                    style({ transform: 'translateX(0)', offset: 1.0 }),
                                ]
                            ),
                        ),
                    ]
                ),
            ]
        ),
    ],
})

export class RegisterComponent {
    registerForm!: FormGroup;

    constructor(
        private loginService: LoginService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {

        this.registerForm = new FormGroup(
            {
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
            },
            {
                validators: confirmPasswordValidator
            }
        );

    }


    onSubmit() {
        if (this.registerForm.valid) {

            let login: LoginPostRequestBody = {
                first_name: this.registerForm.value.firstName,
                paternal_surname: this.registerForm.value.paternalSurname,
                maternal_surname: this.registerForm.value.maternalSurname,
                mail: this.registerForm.value.mail,
                phone: this.registerForm.value.phone,
                password: this.registerForm.value.password,
                isVerified: true,
                isCertified: false
            };

            this.loginService.newLogin(login).subscribe( (response) => {
                if (response.status === 201) {
                    this.loginService.login(response.data.login_Id?.toString());
                    this.router.navigate(['/home']);
                } else {
                    console.log('User not created');
                }
            });



        } else {
            this.registerForm.markAllAsTouched();
        }
    }

}
