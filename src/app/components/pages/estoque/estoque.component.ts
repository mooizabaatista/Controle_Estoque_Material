import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { EstoqueService } from 'src/app/services/estoque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, private authService: AuthService) { }

  displayedColumns: string[] = ['produto', 'qtdInicial', 'qtdEntrada', 'qtdSaida', 'estoqueFinal', 'acoes'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.estoqueService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.resultado);

        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataStr = data.produto.nome.toLowerCase() + data.qtdInicial + data.qtdEntrada + data.qtdSaida + data.estoqueFinal;
          return dataStr.includes(filter);
        };

        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: any) {
    Swal.fire({
      title: "Deseja realmente excluir?",
      text: "Esta ação não poderá ser revertida.",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Excluir',
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#ec1561"
    }).then(r => {
      if (r.isConfirmed) {
        if (this.authService.isAdmin()) {
          this.estoqueService.remove(id).subscribe({
            next: (data => {
              if (data.estaValido) {
                Swal.fire({
                  title: 'Excluido com sucesso',
                  icon: 'success',
                  showCancelButton: false,
                  customClass: {
                    confirmButton: "btn btn-success"
                  }
                }).then((r) => {
                  this.getAll()
                })
              }
            })
          })
        } else {
          Swal.fire({
            title: 'Atenção',
            icon: 'warning',
            text: "Você não tem permissão para realizar esta ação.",
            showCancelButton: false,
          }).then((r) => {
            this.getAll()
          })
        }
      }
    })
  }
}
