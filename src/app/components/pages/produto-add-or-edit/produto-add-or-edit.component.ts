import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { showMessage } from 'src/app/utils/show-message-util.ts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-add-or-edit',
  templateUrl: './produto-add-or-edit.component.html',
  styleUrls: ['./produto-add-or-edit.component.scss']
})

export class ProdutoAddOrEditComponent implements OnInit {

  produtoId!: string | null;
  isEdit = false;
  frm!: FormGroup;
  produtoEdit!: Produto
  produtos: any

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    if (this.getId()) {
      this.isEdit = true;
      this.produtoService.getById(Number(this.produtoId)).subscribe({
        next: (data) => {
          this.produtoEdit = data.resultado as Produto

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
      this.produtoService.add(this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/produtos');
        },
        error: (error) => {
          showMessage('Erro', 'error', 'Falha ao realizar a operação..', false, this.router, undefined, '/produtos');
        }
      })
    } else {
      this.produtoService.edit(Number(this.produtoId), this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/produtos');
        },
        error: (error) => {
          showMessage('Erro', 'error', 'Falha ao realizar a operação..', false, this.router, undefined, '/produtos');
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
