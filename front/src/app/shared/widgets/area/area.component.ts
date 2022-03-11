import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: any = [];
  // @Input() type: any = null;
  // @Input() titleText: any = null;
  // @Input() subTitleText: any = null;
  // @Input() valueSuffix: any = null;

  Highcharts = Highcharts;

  constructor() {
    this.chartOptions = {};
   }

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Interfaces stats over time'
      },
      subtitle: {
        text: 'Interfaces life cycles active and down time by device'
      },
      tooltip: {
        split: true,
        valueSuffix: ' minutes'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series: [{
        name: 'Device 1',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
        name: 'Device 2',
        data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
        name: 'Device 3',
        data: [163, 203, 276, 408, 547, 729, 628]
    }, {
        name: 'Device 4',
        data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
        name: 'Device 5',
        data: [2, 2, 2, 6, 13, 30, 46]
    }]
    };

     HC_exporting(Highcharts);

     setTimeout(() => {
       window.dispatchEvent(
         new Event('resize')
       );
     }, 300);
  }
}
