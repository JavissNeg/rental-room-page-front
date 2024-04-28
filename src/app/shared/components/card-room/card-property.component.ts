import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-card-property',
    standalone: true,
    imports: [
        NgFor
    ],
    templateUrl: './card-property.component.html',
    styleUrl: './card-property.component.scss'
})

export class CardPropertyComponent {

    @Input() properties!: Property[];

    constructor(
        private router:Router,
    ) { }

    ngOnInit(): void {
    }

    gonnaToPropertyDetail(index: number) {
        this.router.navigate(
            [
                `/property/detail`,
            ],
            {
                queryParams: {
                    property_id: this.properties[index].property_id
                }
            }
        );
    }

}

