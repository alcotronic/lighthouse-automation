import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '@lighthouse-automation/frontend/feature/login';
import { SetupComponent } from '@lighthouse-automation/frontend/feature/setup';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
