import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = environment.apiUrl;

  constructor() { }

  sendMail(mail: any): void {
    console.log('Sending mail:', mail);
  }

}
