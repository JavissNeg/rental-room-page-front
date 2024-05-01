import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property';
import { NgClass, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cont-card-property',
    standalone: true,
    imports: [
        NgClass,
        NgFor,
        NgIf,
    ],
    templateUrl: './cont-card-property.component.html',
    styleUrl: './cont-card-property.component.scss'
})

export class ContCardsPropertyComponent {

    @Input() properties!: Property[];

    constructor(
        private router:Router,
        private viewPortScroller: ViewportScroller
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
        ).then( () => {
            this.viewPortScroller.scrollToPosition([0, 0]);
        });
    }

}

