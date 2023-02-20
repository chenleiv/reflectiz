import { Component, Input } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'engine-type-chart',
  templateUrl: './engine-type-chart.component.html',
  styleUrls: ['./engine-type-chart.component.scss'],
})
export class EngineTypeChartComponent {
  @Input() users: any;
  engineCount: {};
  barChartData: ChartDataset[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setEngineChart();

    this.barChartData = [
      {
        label: 'male',
        data: [
          this.engineCount['male'].electric,
          this.engineCount['male'].fuel,
        ],
        backgroundColor: ['#a7beae', '#a7beae'],
      },
      {
        label: 'female',
        data: [
          this.engineCount['female'].electric,
          this.engineCount['female'].fuel,
        ],
        backgroundColor: ['#b85042c9', '#b85042c9'],
      },
      {
        label: 'prefer not to say',
        data: [
          this.engineCount['prefer not to say']?.electric,
          this.engineCount['prefer not to say']?.fuel,
        ],
        backgroundColor: ['#e7e8d1', '#e7e8d1'],
      },
    ];
  }

  setEngineChart = () => {
    this.users.reduce((acc, user: any) => {
      if (!acc[user.gender]) {
        acc[user.gender] = {};
      }
      if (!acc[user.gender][user.engine]) {
        acc[user.gender][user.engine] = 0;
      }
      acc[user.gender][user.engine]++;
      this.engineCount = acc;
      return acc;
    }, {});
  };

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLabels: string[] = ['fuel', 'electric'];
}
