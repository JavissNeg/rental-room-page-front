import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    // nombre
    
    inmuebles : any[] = [
        {
            inmueble_id: 1,
            precio : 1565
        },
    ];

    public ejemplo : string = "hola mundo 1";

    printMsg() {
        
    }       

}
