import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FrenteServicoService } from 'src/app/services/frente-servico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frente-servico',
  templateUrl: './frente-servico.component.html',
  styleUrls: ['./frente-servico.component.scss']
})
export class FrenteServicoComponent implements OnInit{

  constructor(private frenteServicoService: FrenteServicoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAll();
  }


  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAll() {
    this.frenteServicoService.getAll().subscribe({
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


  onDelete(id: number) {
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
          this.frenteServicoService.remove(id).subscribe({
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
