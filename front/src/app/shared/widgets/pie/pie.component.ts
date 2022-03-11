import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {
    this.chartOptions = {};
   }

  ngOnInit(): void {
    this.chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Network Devices summary'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Devices',
        colorByPoint: true,
        data: [{
            name: 'Hub',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Switch',
            y: 11.84
        }, {
            name: 'Bridge',
            y: 10.85
        }, {
            name: 'Gateway',
            y: 4.67
        }, {
            name: 'Access Point',
            y: 4.18
        }, {
            name: 'Other',
            y: 7.05
        }]
    }]
    }
    HC_exporting(Highcharts);

     setTimeout(() => {
       window.dispatchEvent(
         new Event('resize')
       );
     }, 300);
  }
}
