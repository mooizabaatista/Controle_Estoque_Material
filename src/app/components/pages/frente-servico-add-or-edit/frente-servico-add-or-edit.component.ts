import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrenteServico } from 'src/app/interfaces/frente-servico';
import { FrenteServicoService } from 'src/app/services/frente-servico.service';
import { showMessage } from 'src/app/utils/show-message-util.ts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frente-servico-add-or-edit',
  templateUrl: './frente-servico-add-or-edit.component.html',
  styleUrls: ['./frente-servico-add-or-edit.component.scss']
})
export class FrenteServicoAddOrEditComponent {


  produtoId!: string | null;
  isEdit = false;
  frm!: FormGroup;
  produtoEdit!: FrenteServico
  produtos: any

  constructor(
    private formBuilder: FormBuilder,
    private frenteServicoService: FrenteServicoService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    if (this.getId()) {
      this.isEdit = true;
      this.frenteServicoService.getById(Number(this.produtoId)).subscribe({
        next: (data) => {
          this.produtoEdit = data.resultado as FrenteServico

          this.frm.patchValue({
            nome: this.produtoEdit.nome,
            descricao: this.produtoEdit.descricao
          })
        },
        error: (error) => {
          Swal.fire({
            html: `<h1>Erro!</h1>
                  <h2>${error.error.mensagem}.</h2>`,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: "#3F51B5"
          })
        }
      })
    }

    this.frm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['']
    })
  }


  SubmitForm() {
    // Adicionar Produto
    if (!this.getId()) {
      this.frenteServicoService.add(this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/frente-servico');
        },
        error: (error) => {
          showMessage('Erro', 'error', 'Falha ao realizar a operação..', false, this.router, undefined, '/add-or-edit-frente-servico');
        }
      })
    } else {
      this.frenteServicoService.edit(Number(this.produtoId), this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/frente-servico');
        },
        error: (error) => {
          showMessage('Erro', 'error', 'Falha ao realizar a operação..', false, this.router, undefined, '/add-or-edit-frente-servico');
        }
      })
    }
  }

  getId(): Boolean {
    let hasId = false;
    this.route.paramMap.subscribe(params => {
      if (params.get('id?')) {
        this.produtoId = params.get('id?')
        hasId = true;
      } else {
        hasId = false;
      }
    })
    return hasId;
  }
}
