import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	valueSearch: string = '';

	constructor(
		private loginService: LoginService,
		private router: Router,
		private aciveRoute: ActivatedRoute,
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
		
		this.aciveRoute.queryParams.subscribe( (params: any) => {
			this.valueSearch = params.search || '';
		});
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

	search(event: any) {
		if (event.keyCode === 13) {
			this.goToSearch();
		} else {
			this.valueSearch = event.target.value;
		}
	}

	goToSearch() {
		this.router.navigate(
			['/property/search'],
			{
				queryParams: {
					search: this.valueSearch
				}
			}
		);
	}
	

}
