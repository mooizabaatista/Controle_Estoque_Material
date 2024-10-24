import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estoque } from 'src/app/interfaces/estoque';
import { EstoqueService } from 'src/app/services/estoque.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { ResponseData } from 'src/app/interfaces/response-data';
import Swal from 'sweetalert2';
import { showMessage } from 'src/app/utils/show-message-util.ts';

@Component({
  selector: 'app-estoque-add-or-edit',
  templateUrl: './estoque-add-or-edit.component.html',
  styleUrls: ['./estoque-add-or-edit.component.scss']
})
export class EstoqueAddOrEditComponent implements OnInit {

  estoqueId!: string | null;
  isEdit = false;
  frm!: FormGroup;
  estoqueEdit?: Estoque = undefined
  produtos: any
  produtosJaEmEstoque: any

  constructor(
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService,
    private router: Router,

    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getId();

    this.produtoService.getAllNotInEstoque().subscribe({
      next: (data) => {
        this.produtosJaEmEstoque = data.resultado
      }
    })

    this.frm = this.formBuilder.group({
      produtoId: ['', [Validators.required]], // FormControl para produto
      qtdInicial: ['', [Validators.required, Validators.min(0)]], // FormControl para qtdInicial
    });

    this.produtoService.getAll().subscribe({
      next: (data) => {
        this.produtos = data.resultado
      }
    })

    if (this.estoqueId) {
      this.isEdit = true;
      this.estoqueService.getById(Number(this.estoqueId)).subscribe({
        next: (data) => {
          this.estoqueEdit = data.resultado as Estoque

          console.log(this.estoqueEdit)

          this.frm.patchValue({
            produtoId: this.estoqueEdit.produto.id,
            qtdInicial: this.estoqueEdit.qtdInicial
          })
        }
      })
    }
  }



  onSubmit() {
    if (this.estoqueId) {
      this.estoqueService.edit(Number(this.estoqueId), this.frm.value).subscribe({
        next: (data) => {
          console.log("foi daqui")
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/estoque');
        },
        error: (error) => {
          showMessage('Erro', 'error', error.error.mensagem, false, this.router, undefined, '/add-or-edit-estoque/' + this.estoqueId);
        }
      })
    } else {
      this.estoqueService.add(this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/estoque');
        },
        error: (error) => {
          showMessage('Erro', 'error', error.error.mensagem, false, this.router, undefined, '/add-or-edit-estoque/');
        }
      })
    }
  }


  getId(): Boolean {
    let hasId = false;
    this.route.paramMap.subscribe(params => {
      if (params.get('id?')) {
        this.estoqueId = params.get('id?')
        hasId = true;
      } else {
        hasId = false;
      }
    })
    return hasId;
  }


  isProductDisabled(produto: any): boolean {
    return this.produtosJaEmEstoque.some((p: any) => p.id === produto.id);
  }
}
