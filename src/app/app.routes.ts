import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-login/user-login.component').then(m => m.UserLoginComponent)
    }
];
