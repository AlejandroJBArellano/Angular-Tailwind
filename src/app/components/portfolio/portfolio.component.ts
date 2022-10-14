import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  options = {
    series: [],
    xaxis: {
      categories: [],
    },
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: 'Nearest objects in the Earth',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#239ff812', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    noData: {
      text: 'Loading...',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined,
      },
    },
    events: {
      updated: (chartConx: any, config: any) => {
        console.log('updated');
      },
    },
  };
  declare chart: ApexCharts;
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.chart = new ApexCharts(document.querySelector('#chart'), this.options);
    this.chart.render();

    this.initializeLineChart('2022-09-12', '2022-09-17');
  }

  initializeLineChart(firstDate: string, secondDate: string) {
    this.portfolioService
      .getNearestObjectsBetweenDates(firstDate, secondDate)
      .subscribe((res: any) => {
        const values: { key: string; value: number }[] = [];

        Object.entries(res.near_earth_objects).forEach((key, value) => {
          const nearestObjects = key[1] as Array<[]>;
          values.push({
            key: key[0],
            value: nearestObjects.length,
          });
        });
        this.chart.updateSeries([
          {
            data: values.map(({ value }) => value),
          },
        ]);
        this.chart.addXaxisAnnotation({
          categories: values.map(({ key }) => new Date(key).toDateString()),
        });
      });
  }

  changeData() {}
}
