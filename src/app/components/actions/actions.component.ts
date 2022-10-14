import { Component, OnInit } from '@angular/core';
import { ISalary } from 'src/app/types/Salary';
// @ts-ignore
import * as XLSX from 'xlsx/xlsx';
import { ActionsService } from '../../services/actions.service';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  constructor(private actionsService: ActionsService) {}
  declare rows: {
    job: string;
    salary: number;
  }[];

  ngOnInit(): void {
    this.initializeCharts();
  }
  initializeCharts() {
    this.actionsService.getAFSalaries().subscribe((res: any) => {
      const { salaries } = res;
      const jobs = (salaries as ISalary[])
        .map((salary: ISalary) => ({
          job: salary.job.title,
          salary: salary.salary_percentiles.percentile_75,
        }))
        .sort((a: any, b: any) => b.salary - a.salary)
        .slice(0, Math.floor(Math.random() * 20));
      this.rows = jobs;
      this.initializePieChart(jobs);
      this.initializeLineChart(
        jobs.map(({ job }) => job),
        jobs.map(({ salary }) => Math.floor(salary))
      );
    });
  }
  initializeLineChart(categories: any, data: any) {
    const options = {
      series: [
        {
          data,
        },
      ],
      xaxis: {
        categories,
      },
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'Most Valuables Jobs in Afghanistan',
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

  exportToExcel() {
    console.log(this.rows);
    const worksheet = XLSX.utils.json_to_sheet(this.rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');
    XLSX.utils.sheet_add_aoa(worksheet, [['Country', 'Salary']], {
      origin: 'A1',
    });
    XLSX.writeFile(workbook, 'Best-Salaries-In-Afghanistan.xlsx');
  }
}
