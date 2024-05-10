import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';


const routes: Routes = [
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        canActivate: [authGuard],
    },
    {
        path: 'verification',
        loadComponent: () => import('./verification/verification.component').then(m => m.VerificationComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate: [authGuard],
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
