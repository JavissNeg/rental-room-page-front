import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
    
export class DetailComponent{
    
    property_id!: number;

    constructor(
        private activateRoute: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.activateRoute.queryParams.subscribe(params => {
            this.property_id = params['property_id'];
        });
    }

}