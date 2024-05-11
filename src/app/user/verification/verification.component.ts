import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { LoginGetResponse, LoginRequestBody } from 'src/app/shared/interfaces/login';
import { MailRequestBody } from 'src/app/shared/interfaces/mail';
import { VerificationCodeRequestBody } from 'src/app/shared/interfaces/VerificationCode';
import { LoginService } from 'src/app/shared/services/login.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { VerificationCodeService } from 'src/app/shared/services/verificationCode.service';



@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
	ReactiveFormsModule,
	NgIf,
	SpinnerComponent,
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
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
export class VerificationComponent {

	verificationGroup!: FormGroup;
	login: LoginRequestBody = {} as LoginRequestBody;
	loading: boolean = false;
	disabledSend: boolean = true;

    constructor(
		private loginService: LoginService,
		private verificationCodeService: VerificationCodeService,
		private mailService: MailService,
		private router: Router,
	) {
	}

    ngOnInit(): void {

		this.router.events
		.pipe(filter(event => event instanceof NavigationEnd))
		.subscribe(() => {
			this.loginService.deleteData();
		});
		

		this.verificationGroup = new FormGroup(
			{
				code: new FormControl(
					'',
					[
						Validators.required,
						Validators.minLength(1),
					]
				),
			}
		);


		this.login = this.loginService.getData();
		if (Object.keys(this.login).length === 0) {
			this.router.navigate(['user/register']);
			
		} 

		
	}

	verification(): void {

		if(this.verificationGroup.get('code')?.valid) {

			this.loading = true;

			this.verificationCodeService.isAvailable(this.login.mail).subscribe( (res) => {
				
				if (res.status === 200) {

					if(res.data.code === this.verificationGroup.get('code')?.value.toString()) {
			
						this.verificationGroup.setErrors(
							{
								'incorrect': null
							}
						);

						this.loginService.newLogin(this.login).subscribe( (res: LoginGetResponse) => {
							
							if (res.status === 201) {
			
								this.loginService.login(
									res.data.login_id.toString(),
									res.data.first_name
								);

								let dataMail: MailRequestBody = {
									type: '',
									mail: this.login.mail,
									addressee: this.login.first_name
								};

								this.mailService.sendCompleteRegistration(dataMail).subscribe( (res) => {

									if (res.status === 200) {
										this.loading = false;
										this.loginService.deleteData();
										this.router.navigate(['/home']);
									}

								});
		
			
							} else {
								this.loading = false;
							}
			
						},
						(err) => {
							this.loading = false;
						});

					} else {

						this.loading = false;
						this.verificationGroup.setErrors(
							{ 'incorrect': true }
						);

					}

				} else {
					this.loading = false;
					this.disabledSend = false; 
				}
			},
			(err) => {
				this.loading = false;
			});

		}

	}

	resend(): void {
		
		this.loading = true;
		let dataMail: MailRequestBody = {
			type: '',
			mail: this.login.mail,
			addressee: this.login.first_name,
		};

		this.mailService.sendMailVerification(dataMail).subscribe( (res) => {

			if (res.status === 200) {
				this.disabledSend = true;
				this.loading = false;
			}

		},
		(err) => {
			this.loading = false;
		
		});
	}

	getMessagesErrors(control: string): string {
        if (this.verificationGroup.get(control)?.hasError('required')) {
            return 'Este campo es obligatorio';
        
        } else {
            return '';
        }
    }

}
