import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TenantsComponent } from './modules/tenants/tenants.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path:'',
    component: DashboardComponent
  }, {
    path:'tenants',
    component: TenantsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
