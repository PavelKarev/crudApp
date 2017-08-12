import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { CallbackComponent } from './app/callback/callback.component';


export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'callback', component: CallbackComponent }
]