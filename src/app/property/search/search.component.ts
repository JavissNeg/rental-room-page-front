import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContCardsPropertyComponent } from 'src/app/shared/components/cont-cards-room/cont-card-property.component';
import { Cities, CityGetResponse } from 'src/app/shared/interfaces/city';
import { Country, ResponseGetCountry } from 'src/app/shared/interfaces/country';
import { Property, PropertyGetResponse } from 'src/app/shared/interfaces/property';
import { StateResponse, States } from 'src/app/shared/interfaces/state';
import { CityService } from 'src/app/shared/services/city.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { PropertyService } from 'src/app/shared/services/property.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ContCardsPropertyComponent,
	NgFor
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

	search!: string;
	cities!: Cities[];
	states!: States[];
	countries!: Country[];
	properties: Property[] = [];

	constructor(
		private activateRoute: ActivatedRoute,
		private propertyService: PropertyService,
		private cityService: CityService,
		private stateService: StateService,
		private countryService: CountryService,
	) { }

	ngOnInit() {
		this.activateRoute.queryParams.subscribe(params => {
			this.search = params['search'];
			this.propertyService.getPropertyByName(this.search).subscribe( (res: PropertyGetResponse) => {
				this.properties = res.data as Property[];
			});
		});

		this.cityService.getCities().subscribe( (res: CityGetResponse) => {
			this.cities = res.data as Cities[];
		});

		this.stateService.getStates().subscribe( (res: StateResponse) => {
			this.states = res.data as States[];
		});

		this.countryService.getCountries().subscribe( (res: ResponseGetCountry) => {
			this.countries = res.data as Country[];
		});

	}

	searchByCity(city_id: number) {
		this.propertyService.getPropertyByCity(city_id.toString()).subscribe((res: PropertyGetResponse) => {
			this.properties = res.data as Property[];
		});
	}

	searchByState(state_id: number) {
		this.propertyService.getPropertyByState(state_id).subscribe((res: PropertyGetResponse) => {
			this.properties = res.data as Property[];
		});
	}

	searchByCountry(country_id: number) {
		this.propertyService.getPropertyByCountry(country_id).subscribe((res: PropertyGetResponse) => {
			this.properties = res.data as Property[];
		});
	}

}
