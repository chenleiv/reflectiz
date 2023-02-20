import { Component, Input } from '@angular/core';
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'cities-chart',
  templateUrl: './cities.chart.component.html',
  styleUrls: ['./cities.chart.component.scss'],
})
export class CitiesChartComponent {
  @Input() users: any;

  pieChartData: ChartDataset[] = [];
  pieChartLabels: string[];

  ngOnInit(): void {
    const cities = this.setCommonCities();
    this.pieChartData = [
      {
        data: [cities[0], cities[2], cities[4], cities[6]],
        backgroundColor: ['#ffccd6', '#4d5198 ', '#81b7d2', '#984d75c7'],
        borderColor: ['#0000'],
      },
    ];
    this.pieChartLabels = [cities[1], cities[3], cities[5], cities[7]];
  }

  setCommonCities = () => {
    const allCities = this.users.flatMap((user: any) => user.city);

    const cityCounts = allCities.reduce((acc, hobby) => {
      acc[hobby] = (acc[hobby] || 0) + 1;
      return acc;
    }, {});

    const sortedcities = Object.entries(cityCounts)
      .sort(([, count1]: any, [, count2]: any) => count2 - count1)
      .map(([hobby]) => hobby);
    const mostCommonCity1 = sortedcities[0];
    const mostCommonCity2 = sortedcities[1];
    const mostCommonCity3 = sortedcities[2];
    const mostCommonCity4 = sortedcities[3];
    const count1 = cityCounts[mostCommonCity1];
    const count2 = cityCounts[mostCommonCity2];
    const count3 = cityCounts[mostCommonCity3];
    const count4 = cityCounts[mostCommonCity4];
    return [
      count1,
      mostCommonCity1,
      count2,
      mostCommonCity2,
      count3,
      mostCommonCity3,
      count4,
      mostCommonCity4,
    ];
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  pieChartType: ChartType = 'pie';
}
