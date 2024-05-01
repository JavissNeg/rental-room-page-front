import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginPostRequestBody } from 'src/app/shared/interfaces/login';
import { Router } from '@angular/router';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ PasswordNoMatch: true });
    }
    
    return null;
};

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
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
                        }
                    )
                ),
                state(
                    'end', 
                    style(
                        {
                            border: '2px #C04000 solid',
                            color: '#C04000',
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
                                    style({ transform: 'translateX(0)', offset: 0, backgroundColor: '#C04000', color: '#ffffff' }),
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
                        Validators.pattern(/^[a-zA-Záéíóú\s]+$/),
                    ]
                ),
                'paternalSurname': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(15),
                        Validators.pattern(/^[a-zA-Záéíóú\s]+$/),
                    ]
                ),
                'maternalSurname': new FormControl( 
                    null, 
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(15),
                        Validators.pattern(/^[a-zA-Záéíóú\s]+$/),
                    ]
                ),
                'mail': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(50),
                    ]
                ),
                'phone': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(10),
                        Validators.pattern(/^[0-9]+$/),
                    ]
                ),
                'password': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(20),
                    ]
                ),
                'confirmPassword': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(20),
                    ]
                )
            },
            {
                validators: confirmPasswordValidator
            }
        );

    }

    getMessagesErrors(control: string): string {
        if (this.registerForm.get(control)?.hasError('required')) {
            return 'Este campo es obligatorio';
        
        } else if (this.registerForm.get(control)?.hasError('minlength')) {
            return 'Este campo debe tener al menos ' + this.registerForm.get(control)?.errors?.["minlength"].requiredLength + ' caracteres';
        
        } else if (this.registerForm.get(control)?.hasError('maxlength')) {
            return 'Este campo debe tener como máximo ' + this.registerForm.get(control)?.errors?.["maxlength"].requiredLength + ' caracteres';
            
        } else if (this.registerForm.get(control)?.hasError('pattern')) {
            return 'Este campo debe contener solo letras';
        
        } else if (this.registerForm.get(control)?.hasError('email')) {
            return 'Este campo debe contener un correo electrónico válido';
        
        } else if (this.registerForm.get(control)?.hasError('PasswordNoMatch')) {
            return 'Las contraseñas no coinciden';
        
        } else {
            return '';
        }
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
                    this.loginService.login(
                        response.data.login_Id?.toString(),
                        response.data.first_name
                    );
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
