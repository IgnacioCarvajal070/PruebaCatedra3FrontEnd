import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-login/user-login.component').then(m => m.UserLoginComponent),
        pathMatch: 'full'
    },
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
        canActivate: [authGuard]
    },
    {
        path: 'post-list',
        loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'create-post',
        loadComponent: () => import('./pages/post-create/post-create.component').then(m => m.PostCreateComponent),
        canActivate: [authGuard]
    }

];
