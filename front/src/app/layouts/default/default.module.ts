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
import { ShowDeviceConfigurationComponent } from 'src/app/modules/devices/show-device-configuration/show-device-configuration.component';
import { ShowDeviceInterfacesComponent } from 'src/app/modules/devices/show-device-interfaces/show-device-interfaces.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import { ShowProtocolsComponent } from 'src/app/modules/protocols/show-protocols/show-protocols.component';
import { AddEditProtocolComponent } from 'src/app/modules/protocols/add-edit-protocol/add-edit-protocol.component';
import { ShowInterfacesComponent } from 'src/app/modules/interfaces/show-interfaces/show-interfaces.component';
import { AddEditInterfaceComponent } from 'src/app/modules/interfaces/add-edit-interface/add-edit-interface.component';
import { ShowConfigurationsComponent } from 'src/app/modules/configurations/show-configurations/show-configurations.component';
import { AddEditConfigurationComponent } from 'src/app/modules/configurations/add-edit-configuration/add-edit-configuration.component';
import { AssignConfigurationComponent } from 'src/app/modules/configurations/assign-configuration/assign-configuration.component';
import { ShowTenantsComponent } from 'src/app/modules/tenants/show-tenants/show-tenants.component';
import { ShowTenantTopologiesComponent } from 'src/app/modules/tenants/show-tenant-topologies/show-tenant-topologies.component';
import { AddEditTenantComponent } from 'src/app/modules/tenants/add-edit-tenant/add-edit-tenant.component';
import { EditorComponent } from 'src/app/modules/topologies/editor/editor.component';
import { GojsAngularModule } from 'gojs-angular';
import { ShowDeviceDetailsComponent } from 'src/app/modules/devices/show-device-details/show-device-details.component';

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
    ShowDeviceConfigurationComponent,
    ShowDeviceInterfacesComponent,
    ShowProtocolsComponent,
    AddEditProtocolComponent,
    ShowInterfacesComponent,
    AddEditInterfaceComponent,
    ShowConfigurationsComponent,
    AddEditConfigurationComponent,
    AssignConfigurationComponent,
    ShowTenantsComponent,
    ShowTenantTopologiesComponent,
    AddEditTenantComponent,
    EditorComponent,
    ShowDeviceDetailsComponent
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
    MatChipsModule,
    NgbModule,
    MatProgressBarModule,
    MatListModule,
    GojsAngularModule
  ]
})
export class DefaultModule { }
