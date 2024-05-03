import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { PropertyService } from 'src/app/shared/services/property.service';
import { Property } from 'src/app/shared/interfaces/property';
import { NgFor, NgIf } from '@angular/common';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { PaymentGetResponse, PaymentRequestPurchase } from 'src/app/shared/interfaces/payment';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        NgFor,
        NgIf
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
    
export class DetailComponent{
    
    property: Property = {
        property_id: 0,
        name: '',
        description: '',
        bedrooms_number: '',
        bathrooms_number: '',
        image_url: [],
        price: '',
        isVerified: '',
        isAvaible: '',
        rating: 0,
        lessor_id: '',
        address_id: '',
        property_type_id: '',
        currency_id: '',
        period_id: '',
        created_at: null,
        updated_at: null,
        login: {
            login_id: 0,
            first_name: '',
            paternal_surname: '',
            maternal_surname: '',
            mail: '',
            phone: '',
        },
        address: {
            address_id: 0,
            location: null,
            street: '',
            district: '',
            zip_code: '',
            street_number: '',
            apartment_number: '',
            city_id: '',
            created_at: '',
            updated_at: '',
            city: {
                city_id: 0,
                city: '',
                state_id: '',
                created_at: '',
                updated_at: '',
                state: {
                    state_id: 0,
                    state: '',
                    country_id: '',
                    created_at: '',
                    updated_at: '',
                    country: {
                        country_id: 0,
                        country: '',
                        created_at: '',
                        updated_at: '',
                    }
                }
            }
        },
        property_type: {
            property_type_id: 0,
            property_type: '',
            description: '',
            created_at: '',
            updated_at: '',
        },
        currency: {
            currency_id: 0,
            name: '',
            symbol: '',
            code: '',
            created_at: '',
            updated_at: '',
        },
        period: {
            period_id: 0,
            period: '',
            created_at: '',
            updated_at: '',
        }
    };

    index: number = 0;

    constructor(
        private activateRoute: ActivatedRoute,
        private propertyService: PropertyService,
        private paymentService: PaymentService,
        private loginService: LoginService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.activateRoute.queryParams.subscribe(params => {
            let property_id = params['property_id'];

            this.propertyService.getPropertyById(property_id).subscribe( res => {
                if(res.status == 200) {
                    this.property = res.data as Property;
                    
                } else {
                    console.log(res.message);

                }
            });
        });
    }


    nextImage() {
        if (this.index < this.property.image_url.length - 1)
            this.index++;
        else 
            this.index = 0;
    }

    previousImage() {
        if (this.index > 0)
            this.index--;
        else 
            this.index = this.property.image_url.length - 1;
    }
    
    purchase() {

        // quit !
        if (!this.loginService.isLoggedIn()) {

            let data: PaymentRequestPurchase = {
                amount: Number(this.property.price),
                currencyCode: this.property.currency.code,
                returnUrl: '',
                cancelUrl: '',
                payment_type: 'Paypal',
                property_id: this.property.property_id,
                lessee_id: Number(this.loginService.getLoginId())
            };
            
            this.paymentService.purchasePayment(data).subscribe( (res: PaymentGetResponse) => {
                
                if(res.status == 200) {

                    if(res.data.redirect_url) {
                        window.location.href = res.data.redirect_url;
                    }
    
                } else {
                    console.log(res.message);

                }

            });
            
        } else {
            this.router.navigate(['user/login']);

        }
    }
}