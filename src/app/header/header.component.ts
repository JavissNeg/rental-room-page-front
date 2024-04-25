import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

	bgVisible: boolean = false;
	private suscriptionHeader!: Subscription;

	constructor(
		private headerService: HeaderService
	) {
		
  	}
	
	ngOnInit() {
		this.suscriptionHeader = this.headerService.bgHeadervisible.subscribe((bgVisible: boolean) => {
			this.bgVisible = bgVisible;
		});
	}

	ngOnDestroy() {
		this.suscriptionHeader.unsubscribe();
	}

}
