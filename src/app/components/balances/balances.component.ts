import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { BalancesService } from '../../services/balances.service';
import { ISalary } from '../../types/Salary';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss'],
})
export class BalancesComponent implements OnInit {
  constructor(private balancesService: BalancesService) {}

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts() {
    this.balancesService.getSalaries().subscribe((res: any) => {
      const { salaries } = res;
      const jobs = salaries
        .map((salary: ISalary) => ({
          job: salary.job.title,
          salary: salary.salary_percentiles.percentile_75,
        }))
        .sort((a: any, b: any) => b.salary - a.salary)
        .slice(0, 10);
      console.log(jobs);
      this.initializePieChart(jobs);
    });
    this.balancesService.getHousePrices().subscribe((res: any) => {
      const { dates } = res.data;
      const { values } = res.data;
      this.initializeLineChart(dates, values);
    });
  }

  initializeLineChart(dates: any, values: any) {
    const options = {
      series: [
        {
          name: 'Price of the Houses in USA',
          data: values,
        },
      ],
      xaxis: {
        categories: dates,
      },
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'Most Valuables Jobs in Mexico',
        align: 'center',
      },
    };

    const chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  }

  initializePieChart(jobs: { job: string; salary: number }[]) {
    const options = {
      series: jobs.map(({ salary }) => Math.floor(salary)),
      chart: {
        width: 500,
        type: 'pie',
      },
      labels: jobs.map(({ job }) => job),
    };

    const chart = new ApexCharts(document.querySelector('#donut'), options);
    chart.render();
  }
}
