import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TenantService } from './services/network/tenant.service';
import { TopologyService } from './services/network/topology.service';
import { DeviceService } from './services/network/device.service';
import { InterfaceService } from './services/network/interface.service';
import { ConfigurationService } from './services/network/configuration.service';
import { ProtocolService } from './services/network/protocol.service';
import { DiagramService } from './services/editor/diagram.service';
import { ScriptService } from './services/network/script.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
     HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TenantService,
    TopologyService,
    DeviceService,
    InterfaceService,
    ConfigurationService,
    ProtocolService,
    DiagramService,
    ScriptService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
