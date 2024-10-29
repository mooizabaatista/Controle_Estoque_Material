import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FrenteServicoService } from 'src/app/services/frente-servico.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private movimentacaoService: MovimentacaoService, private frenteServicoService: FrenteServicoService) { }

  nomesTopCinco: string[] = [];
  valoresTopCinco: number[] = [];
  nomesFrenteServicoTopCinco: string[] = [];
  valoresFrenteServicoTopCinco: number[] = [];
  valorMovMaisUsada: any;
  
  coresBar: string[] = [];
  coresPie: string[] = [];

  @ViewChild('barChart') barChart: BaseChartDirective | undefined;
  @ViewChild('pieChart') pieChart: BaseChartDirective | undefined;

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

  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };

  ngOnInit() {
    this.getTopCinco();
    this.getValorMovMaisUsada();
    this.getTopCincoFrenteServico();
  }

  getTopCinco() {
    this.movimentacaoService.getTopCinco().subscribe({
      next: (data) => {
        let topCinco = data.resultado;
        this.nomesTopCinco = topCinco.map((item: any) => item['nome']);
        this.valoresTopCinco = topCinco.map((item: any) => item['contagem']);
        this.coresBar = this.generateRandomColors(this.nomesTopCinco.length);
        this.updateBarChart();
      }
    });
  }

  getTopCincoFrenteServico() {
    this.frenteServicoService.getTopCinco().subscribe({
      next: (data) => {
        let topCinco = data.resultado;
        this.nomesFrenteServicoTopCinco = topCinco.map((item: any) => item['nome']);
        this.valoresFrenteServicoTopCinco = topCinco.map((item: any) => item['contagem']);
        this.coresPie = this.generateRandomColors(this.nomesFrenteServicoTopCinco.length);
      }
    });
  }

  getValorMovMaisUsada() {
    this.movimentacaoService.getTopMov().subscribe({
      next: (data) => {
        this.valorMovMaisUsada = data.resultado[0];
      }
    });
  }

  updateBarChart() {
    this.barChartData.labels = this.nomesTopCinco;
    this.barChartData.datasets = [{
      data: this.valoresTopCinco,
      backgroundColor: this.coresBar,
      label: 'Top 5 Produtos',
    }];
    this.barChart?.update();
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
