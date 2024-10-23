import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from 'src/app/services/produto.service';

export interface Produto {
  id: string,
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})


export class ProdutoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.produtoService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.resultado);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
