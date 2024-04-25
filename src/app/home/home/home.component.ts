import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/header/services/header.service';
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
      private headerService: HeaderService
    ) {}

    ngOnInit() {
      this.headerService.bgHeadervisible.next(false);
    }

    ngOnDestroy() {
      this.headerService.bgHeadervisible.next(true);
    }
}
