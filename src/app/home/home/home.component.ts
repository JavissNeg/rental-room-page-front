import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContCardsPropertyComponent } from 'src/app/shared/components/cont-cards-room/cont-card-property.component';
import { Property } from 'src/app/shared/interfaces/property';
import { LoginService } from 'src/app/shared/services/login.service';
import { PropertyService } from 'src/app/shared/services/property.service';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RegisterComponent,
        ContCardsPropertyComponent,
        NgIf,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})

export class HomeComponent {

    private loginSubsciption!: Subscription;
    sesion!: boolean;

    properties: Property[] = [];

    constructor(
        private loginService: LoginService,
        private propertyService: PropertyService
    ) {
      
    }

    ngOnInit() {
        
        this.loginSubsciption = this.loginService.loginSubject.subscribe( (sesion: boolean) => {
            this.sesion = sesion;
        });

        this.propertyService.getProperties().subscribe( res => {
            
            if (res.status == 200) {
                console.log(res.data);
                this.properties = res.data as Property[] || [] as Property[];

            } else {
                console.log("No properties");
                
            }

        });

    }

    ngOnDestroy() {

        if (this.loginSubsciption) {
            this.loginSubsciption.unsubscribe();
        }

    }
}
