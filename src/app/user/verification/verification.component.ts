import { Component, Input } from '@angular/core';
import { LoginRequestBody } from 'src/app/shared/interfaces/login';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

    login: LoginRequestBody = {
        first_name: 'John',
        paternal_surname: 'Doe',
        maternal_surname: 'Smith',
        mail: 'a@example',
        phone: '1234567890',
        password: 'password',
        isVerified: false,
        isCertified: false,
        address_id: 1,
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
    };
    

    constructor() {}


}
