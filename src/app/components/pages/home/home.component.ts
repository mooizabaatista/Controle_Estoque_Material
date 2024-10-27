import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private movimentacaoService: MovimentacaoService) { }

  nomesTopCinco: string[] = [];
  valoresTopCinco: number[] = [];
  cores: string[] = [];

  getTopCinco() {
    this.movimentacaoService.getTopCinco().subscribe({
      next: (data) => {
        let topCinco = data.resultado;

        this.nomesTopCinco = topCinco.map((item: any) => item['nome']);
        this.valoresTopCinco = topCinco.map((item: any) => item['contagem']);


        this.updateChart(); // Atualiza o gráfico após obter os dados
      }
    });
  }

  ngOnInit() {
    this.getTopCinco();
  }

  updateChart() {
    if (!this.nomesTopCinco.length || !this.valoresTopCinco.length) {
      console.error('Dados insuficientes para gerar o gráfico');
      return; // Impede a atualização se os dados não estiverem prontos
    }

    this.chartOptions = {
      title: {
        text: 'Produtos mais utilizados'
      },
      subtitle: {
        text: 'Saiba os 5 produtos que tiveram mais movimentações'
      },
      yAxis: {
        title: {
          text: 'Número de movimentações'
        },
        min: 0,
      },
      xAxis: {
        categories: this.nomesTopCinco,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        formatter: function () {
          return `<span style="color: ${this.color}">\u25CF</span> <b>${this.series.name}</b>: ${this.y}`;
        }
      },
      series: this.nomesTopCinco.map((nome, index) => ({
        type: 'column',
        name: nome,
        data: [this.valoresTopCinco[index]],
        color: this.cores[index] // Usa a cor correspondente para cada item
      })),
    };
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
}
