import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;
  constructor() { 
    this.chartOptions = {};
  }

  ngOnInit(): void {
  this.chartOptions = {
    chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Interface Speed'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Megabits'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#003399'],
                            [1, '#3366AA']
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
             credits: {
              enabled: false
            },
            series: [{
                type: 'area',
                name: 'Megabits/second',
                data: [71, 58, 78, 39, 31, 66, 55]
            }],
    }
    HC_exporting(Highcharts);

     setTimeout(() => {
       window.dispatchEvent(
         new Event('resize')
       );
     }, 300);
  }

}
