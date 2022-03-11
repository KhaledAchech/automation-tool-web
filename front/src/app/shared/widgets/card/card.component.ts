import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label!: string;
  @Input() total!: string;
  @Input() percentage!: string;

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() {
    this.chartOptions = {};
   }

  ngOnInit(): void {
  this.chartOptions = {
  chart: {
        type: 'bar',
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        }
    },
    legend: {
        reversed: true
    },
    credits: {
        enabled: false
      },
      exporting: {
        enabled: false,
      },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
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
