import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
    
    constructor(
    ) {
      
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }
}
