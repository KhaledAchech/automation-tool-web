import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ShowTopologiesComponent } from 'src/app/modules/topologies/show-topologies/show-topologies.component';
import { AddEditTopologyComponent } from 'src/app/modules/topologies/add-edit-topology/add-edit-topology.component';
import { ShowDevicesComponent } from 'src/app/modules/devices/show-devices/show-devices.component';
import { AddEditDeviceComponent } from 'src/app/modules/devices/add-edit-device/add-edit-device.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TenantsComponent,
    TopologiesComponent,
    DevicesComponent,
    ConfigurationsComponent,
    ProtocolsComponent,
    InterfacesComponent,
    ShowTopologiesComponent,
    AddEditTopologyComponent,
    ShowDevicesComponent,
    AddEditDeviceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class DefaultModule { }
