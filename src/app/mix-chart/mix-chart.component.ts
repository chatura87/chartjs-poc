import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-mix-chart',
  templateUrl: './mix-chart.component.html',
  styleUrls: ['./mix-chart.component.css']
})
export class MixChartComponent implements OnInit {
  chart: Chart;
  canvas: any;
  ctx: any;
  imageUrl: string;
  colorsArray: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(255, 2, 0, 1)'
  ];

  config = {
    type: 'pie',
    data: {
      labels: ['new', 'inprogress'],
      datasets: [{
        label: '# of issues',
        data: [12, 42],
        backgroundColor: this.colorsArray,
        borderWidth: 1
      }],
    },
    options: {
      responsive: false,
      display: true,
      title: { text: 'pie chart', display: true }
    }
  };

  updateColors() {
    this.colorsArray = [
      'rgba(255, 0, 132, 1)',
      'rgba(255, 99, 50, 1)'
    ];
    this.chart.data.datasets[0].backgroundColor = this.colorsArray;
    this.chart.update();
  }

  renderAsImage() {
    if (this.chart) {
      this.imageUrl = this.chart.toBase64Image();
    }
    this.destroyChart();
  }

  changeType() {
    this.destroyChart();
    this.config.type = 'bar';
    this.config.options.title.text = 'bar chart';
    this.chart = new Chart(this.ctx, this.config);
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('mixchart');
    this.ctx = this.canvas.getContext('2d');

    this.chart = new Chart(this.ctx, this.config);
    this.chart.toBase64Image();
  }

}
