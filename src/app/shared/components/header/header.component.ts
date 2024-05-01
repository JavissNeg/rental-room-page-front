import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../..//services/login.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

	private loginSubsciption!: Subscription;
	sesion!: boolean;
	menu: boolean = false;
	name!: string;

	constructor(
		private loginService: LoginService,
		private router: Router,
	) { }
	
	ngOnInit() {
		this.loginSubsciption = this.loginService.loginSubject.subscribe( (sesion: boolean) => {
			this.sesion = sesion;
			if (sesion) {
				this.name = this.loginService.getName()?.toUpperCase() || '';
			}
		});
		
		this.sesion = this.loginService.isLoggedIn();
		if (this.sesion) {
			this.name = this.loginService.getName()?.toUpperCase() || '';
		}
	}

	ngOnDestroy() {
		if (this.loginSubsciption) {
			this.loginSubsciption.unsubscribe();
		}
	}

	toggleMenu() {
		this.menu = !this.menu;
	}

	logout() {
		this.loginService.logout();
		this.sesion = false;
		this.router.navigate(['/home']);
	}

}
