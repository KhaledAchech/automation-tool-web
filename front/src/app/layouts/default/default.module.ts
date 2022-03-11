import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { TenantsComponent } from 'src/app/modules/tenants/tenants.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { TopologiesComponent } from 'src/app/modules/topologies/topologies.component';
import { DevicesComponent } from 'src/app/modules/devices/devices.component';
import { ConfigurationsComponent } from 'src/app/modules/configurations/configurations.component';
import { ProtocolsComponent } from 'src/app/modules/protocols/protocols.component';
import { InterfacesComponent } from 'src/app/modules/interfaces/interfaces.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TenantsComponent,
    TopologiesComponent,
    DevicesComponent,
    ConfigurationsComponent,
    ProtocolsComponent,
    InterfacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule
  ]
})
export class DefaultModule { }
