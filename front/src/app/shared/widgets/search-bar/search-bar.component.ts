import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input()
  dataSource!:any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.subscribe((res:any)=> console.log(res));
  }
  constructor() { }

  ngOnInit(): void {
  }

}
