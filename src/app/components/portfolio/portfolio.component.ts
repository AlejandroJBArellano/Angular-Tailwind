import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.initializeLineChart('2022-09-12', '2022-09-17');
  }

  initializeLineChart(firstDate: string, secondDate: string) {
    this.portfolioService
      .getNearestObjectsBetweenDates(firstDate, secondDate)
      .subscribe((res: any) => {
        console.log(res.near_earth_objects);
        const values: { key: string; value: number }[] = [];

        Object.entries(res.near_earth_objects).forEach((key, value) => {
          const nearestObjects = key[1] as Array<[]>;
          values.push({
            key: key[0],
            value: nearestObjects.length,
          });
        });
        console.log(values);
        const options = {
          series: [
            {
              data: values.map(({ value }) => value),
            },
          ],
          xaxis: {
            categories: values.map(({ key }) => new Date(key).toDateString()),
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
        };

        const chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
      });
  }

  changeData() {}
}
