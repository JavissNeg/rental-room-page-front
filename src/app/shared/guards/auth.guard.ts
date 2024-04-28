import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    
    if (inject(LoginService).isLoggedIn()) {
        inject(Router).navigate(['/home']);
        return false;
    } else {
        return true;
    }
    
};
