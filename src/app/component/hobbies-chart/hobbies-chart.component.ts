import { Component, Input } from '@angular/core';
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'hobbies-chart',
  templateUrl: './hobbies-chart.component.html',
  styleUrls: ['./hobbies-chart.component.scss'],
})
export class HobbiesChartComponent {
  @Input() users: any;

  pieChartData: ChartDataset[] = [];
  pieChartLabels: any;

  ngOnInit(): void {
    const hobbies = this.setHobbiesChart();

    this.pieChartData = [
      {
        data: [hobbies[0], hobbies[2], hobbies[4]],
        backgroundColor: ['#c72f2f', '#36A2EB', '#00000'],
      },
    ];

    this.pieChartLabels = [hobbies[1], hobbies[3], hobbies[5]];
  }

  setHobbiesChart = () => {
    const allHobbies = this.users.flatMap((user: any) => user.hobbies);

    const hobbyCounts = allHobbies.reduce((acc, hobby) => {
      acc[hobby] = (acc[hobby] || 0) + 1;
      return acc;
    }, {});

    const sortedHobbies = Object.entries(hobbyCounts)
      .sort(([, count1]: any, [, count2]: any) => count2 - count1)
      .map(([hobby]) => hobby);
    const mostCommonHobby1 = sortedHobbies[0];
    const mostCommonHobby2 = sortedHobbies[1];
    const mostCommonHobby3 = sortedHobbies[2];
    const count1 = hobbyCounts[mostCommonHobby1];
    const count2 = hobbyCounts[mostCommonHobby2];
    const count3 = hobbyCounts[mostCommonHobby3];
    return [
      count1,
      mostCommonHobby1,
      count2,
      mostCommonHobby2,
      count3,
      mostCommonHobby3,
    ];
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  pieChartType: ChartType = 'doughnut';
}
