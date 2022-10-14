import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts() {
    this.initializeLineChart();
    this.initializePieChart();
  }

  initializeLineChart() {
    var options = {
      series: [
        {
          data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
        },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      stroke: {
        curve: 'stepline',
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Stepline Chart',
        align: 'left',
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
    };

    const line = new ApexCharts(document.querySelector('#line'), options);
    line.render();
  }

  initializePieChart() {
    const options = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const donut = new ApexCharts(document.querySelector('#donut'), options);
    donut.render();
  }
}
