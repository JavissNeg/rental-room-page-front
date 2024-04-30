import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
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
                                    style({ transform: 'translateX(0)', offset: 0, backgroundColor: '#C04000', color: '#ffffff'}),
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
export class LoginComponent {

    loginForm!: FormGroup;
    
    constructor(
        private loginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup(
            {
                'mail': new FormControl(
                    null, 
                    [
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(50)
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
            }
        );
    }

    getMessagesErrors(controlName: string): string {
            
        if (this.loginForm.get(controlName)?.hasError('required')) {
            return 'Este campo es obligatorio';
            
        } else if (this.loginForm.get(controlName)?.hasError('email')) {
            return 'Correo electrónico inválido';

        } else if (this.loginForm.get(controlName)?.hasError('minlength')) {
            return 'La contraseña debe tener al menos ' + this.loginForm.get(controlName)?.errors?.['minlength'].requiredLength + ' caracteres';
       
        } else if (this.loginForm.get(controlName)?.hasError('maxlength')) {
            return 'La contraseña debe tener un máximo de ' + this.loginForm.get(controlName)?.errors?.['maxlength'].requiredLength + ' caracteres';
        }
        
        return '';
    }

    onSubmit(): void {
        
        if (this.loginForm.valid) {
            
            this.loginService.getLoginByMail(this.loginForm.get('mail')?.value).subscribe( res => {
                
                if (res.status === 200) {

                    if (res.data[0].password === this.loginForm.get('password')?.value) {
                        
                        this.loginForm.setErrors(
                            { 'nonExistent': null }
                        );

                        this.loginService.login(
                            res.data[0].login_Id?.toString()
                        );
                        
                        this.router.navigate(['/home']);

                    } else {
                        
                        this.loginForm.setErrors(
                            { 'nonExistent': true }
                        );

                    }

                } else {

                    this.loginForm.setErrors(
                        { 'nonExistent': true }
                    );
                    
                }

            });

        } else {
            this.loginForm.markAllAsTouched();
        }

    }

}
