import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardPropertyComponent } from 'src/app/shared/components/card-room/card-property.component';
import { Property } from 'src/app/shared/interfaces/property';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RegisterComponent,
        CardPropertyComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})

export class HomeComponent {
    
    properties: Property[] = [
        {
            property_id: 1,
            name: 'Casa de playa',
            description: 'Casa de playa en la costa de Lima',
            bedrooms_number: '3',
            bathrooms_number: '2',
            image_url: 'https://www.eldiario.es/fotos/Casa-playa_EDIIMA20190605_0840_19.jpg',
            price: 150000,
            isVerified: true,
            isAvaible: true,
            rating: 5,
            lessor_id: 1,
            address_id: 1,
            property_type_id: 1,
            currency_id: 1,
            period_id: 1,
            created_at: '2021-10-01',
            updated_at: '2021-10-01',
        },
        {
            property_id: 2,
            name: 'Casa de campo',
            description: 'Casa de campo en la sierra de Lima',
            bedrooms_number: '2',
            bathrooms_number: '1',
            image_url: 'https://www.eldiario.es/fotos/Casa-campo_EDIIMA20190605_0840_19.jpg',
            price: 100000,
            isVerified: true,
            isAvaible: true,
            rating: 4,
            lessor_id: 2,
            address_id: 2,
            property_type_id: 2,
            currency_id: 1,
            period_id: 1,
            created_at: '2021-10-01',
            updated_at: '2021-10-01',
        },
        {
            property_id: 3,
            name: 'Casa de ciudad',
            description: 'Casa de ciudad en el centro de Lima',
            bedrooms_number: '1',
            bathrooms_number: '1',
            image_url: 'https://www.eldiario.es/fotos/Casa-ciudad_EDIIMA20190605_0840_19.jpg',
            price: 50000,
            isVerified: true,
            isAvaible: true,
            rating: 3,
            lessor_id: 3,
            address_id: 3,
            property_type_id: 3,
            currency_id: 1,
            period_id: 1,
            created_at: '2021-10-01',
            updated_at: '2021-10-01',
        }
    ];

    constructor(
    ) {
      
    }

    ngOnInit() {
        
    }

    ngOnDestroy() {
    }
}
