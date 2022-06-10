import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ConfigurationsComponent } from './modules/configurations/configurations.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DevicesComponent } from './modules/devices/devices.component';
import { ShowDeviceDetailsComponent } from './modules/devices/show-device-details/show-device-details.component';
import { AccessDeniedComponent } from './modules/errors/access-denied/access-denied.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { ServerErrorComponent } from './modules/errors/server-error/server-error.component';
import { InterfacesComponent } from './modules/interfaces/interfaces.component';
import { ProtocolsComponent } from './modules/protocols/protocols.component';
import { SigninComponent } from './modules/signin/signin.component';
import { TenantsComponent } from './modules/tenants/tenants.component';
import { EditorComponent } from './modules/topologies/editor/editor.component';
import { TopologiesComponent } from './modules/topologies/topologies.component';
import { AuthGuardGuard } from './services/connection/auth-guard.guard';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  canActivate: [AuthGuardGuard],
  children: [{
    path:'',
    component: DashboardComponent
  },{
    path:'tenants',
    component: TenantsComponent
  }, {
    path:'topologies',
    component: TopologiesComponent
  }, {
    path:'devices',
    component: DevicesComponent
  }, {
    path:'devices/details/:id',
    component: ShowDeviceDetailsComponent
  },
   {
    path:'configurations',
    component: ConfigurationsComponent
  }, {
    path:'protocols',
    component: ProtocolsComponent
  }, {
    path:'interfaces',
    component: InterfacesComponent
  }, {
    path : 'editor/:id',
    component: EditorComponent
  }
]
},
{
  path:'signin',
  component: SigninComponent
},
{
  path:'error403',
  component: AccessDeniedComponent
},
{
  path:'error500', // server down
  component: ServerErrorComponent
},
{
  path:'**', // Page not found error
  component: NotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
