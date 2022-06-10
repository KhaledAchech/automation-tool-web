import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SigninComponent } from './modules/signin/signin.component';
import { BasicAuthHtppInterceptorService } from './services/connection/basic-auth-htpp-interceptor.service';
import { AuthenticationService } from './services/connection/authentication.service';
import { AccessDeniedComponent } from './modules/errors/access-denied/access-denied.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AccessDeniedComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
     HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TenantService,
    TopologyService,
    DeviceService,
    InterfaceService,
    ConfigurationService,
    ProtocolService,
    DiagramService,
    ScriptService,
    AuthenticationService,
    {
    provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
