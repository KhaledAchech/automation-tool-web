import {OnInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @Input() displayedColumns!: string[];
  @Input() ELEMENT_DATA!: any[];
 
  dataSource = this.ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }
}