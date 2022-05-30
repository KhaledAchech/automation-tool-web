import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-tenant-topologies',
  templateUrl: './show-tenant-topologies.component.html',
  styleUrls: ['./show-tenant-topologies.component.scss']
})
export class ShowTenantTopologiesComponent implements OnInit {

  @Input() data!: Observable<any[]>;
  topologies!: Observable<any[]>;  

  displayedColumns: string[] = ['id', 'name', 'type', 'view'];
  constructor() { }
  ngOnInit(): void {
    this.topologies = this.data;
  }

}
