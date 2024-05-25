import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginGetResponse, LoginRequestBody } from 'src/app/shared/interfaces/login';
import { Router } from '@angular/router';
import { VerificationComponent } from '../verification/verification.component';
import { VerificationCodeService } from 'src/app/shared/services/verificationCode.service';
import { VerificationCodeRequestBody } from 'src/app/shared/interfaces/VerificationCode';
import { MailService } from 'src/app/shared/services/mail.service';
import { MailRequestBody } from 'src/app/shared/interfaces/mail';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

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
        VerificationComponent,
        SpinnerComponent,
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
    registerFirstStep: boolean = false;
    loading: boolean = false;

    constructor(
        private loginService: LoginService,
        private verificationCodeService: VerificationCodeService,
        private mailService: MailService,
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

            let login: LoginRequestBody = {
                first_name: this.registerForm.value.firstName,
                paternal_surname: this.registerForm.value.paternalSurname,
                maternal_surname: this.registerForm.value.maternalSurname,
                mail: this.registerForm.value.mail,
                phone: this.registerForm.value.phone,
                password: this.registerForm.value.password,
                isVerified: true,
                isCertified: false
            };
            
            this.loginService.setData(login);

            this.loading = true;
            this.verificationCodeService.isAvailable(login.mail).subscribe( (res) => {
				
				if (res.status === 404) {

					let data: VerificationCodeRequestBody = {
						mail: login.mail
					};
                    
					this.verificationCodeService.newCode(data).subscribe( (res) => {
						
						if (res.status === 201) {
                            let mailData: MailRequestBody = {
                                type: '', 
                                mail: login.mail,
                                verification_code: res.data.code,
                                addressee: login.first_name,
                            };

                            this.mailService.sendMailVerification(mailData).subscribe( (res) => {
                                if (res.status === 200) {
                                    this.loading = false;
                                    this.registerFirstStep = true;
                                }
                            });

						}
					
					},
                    (err) => {
                        this.loading = false;
                    });

				}

			},
            (err) => {
                this.loading = false;
            });


        } else {
            this.registerForm.markAllAsTouched();
        }
    }

    goToRouterLink(routerLink: string): void {
        this.router.navigate([routerLink]);
    }

}
