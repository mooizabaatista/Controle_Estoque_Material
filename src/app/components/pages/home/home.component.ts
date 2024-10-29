import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private movimentacaoService: MovimentacaoService) { }

  nomesTopCinco: string[] = [];
  valoresTopCinco: number[] = [];
  cores: string[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  getTopCinco() {
    this.movimentacaoService.getTopCinco().subscribe({
      next: (data) => {
        let topCinco = data.resultado;

        this.nomesTopCinco = topCinco.map((item: any) => item['nome']);
        this.valoresTopCinco = topCinco.map((item: any) => item['contagem']);

        this.cores = this.generateRandomColors(this.nomesTopCinco.length);

        this.updateChart();
      }
    });
  }

  ngOnInit() {
    this.getTopCinco();
  }

  updateChart() {
    this.barChartData.labels = this.nomesTopCinco;
    this.barChartData.datasets = [{
      data: this.valoresTopCinco,
      backgroundColor: this.cores,
      label: 'Top 5 Produtos',
    }];
  
    if (this.chart) {
      this.chart.update();
    }
  }

  getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomHexColor());
    }
    return colors;
  }


  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Anália Franco 1', 'Mooca CT3'],
    datasets: [
      {
        data: [400, 100],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
}
