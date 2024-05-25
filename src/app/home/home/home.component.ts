import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContCardsPropertyComponent } from 'src/app/shared/components/cont-cards-room/cont-card-property.component';
import { Property } from 'src/app/shared/interfaces/property';
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

    properties: Property[] = [];

    constructor(
        private propertyService: PropertyService
    ) {
      
    }

    ngOnInit() {

        this.propertyService.getProperties().subscribe( res => {
            
            if (res.status == 200) {
                console.log(res.data);
                this.properties = res.data as Property[] || [] as Property[];

            } else {
                //console.log("No properties");
                
            }

        });

    }

    ngOnDestroy() {

    }
}
