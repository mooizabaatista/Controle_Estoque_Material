import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimentacao } from 'src/app/interfaces/movimentacao';
import { FrenteServicoService } from 'src/app/services/frente-servico.service';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { showMessage } from 'src/app/utils/show-message-util.ts';

@Component({
  selector: 'app-movimentacao-add-or-edit-',
  templateUrl: './movimentacao-add-or-edit.component.html',
  styleUrls: ['./movimentacao-add-or-edit.component.scss']
})
export class MovimentacaoAddOrEditComponent implements OnInit {
  movimentacaoId!: string | null;
  isEdit = false;
  frm!: FormGroup;
  movimentacaoEdit!: Movimentacao
  movimentacoes: any
  produtos: any
  frenteServicos: any

  constructor(
    private formBuilder: FormBuilder,
    private movimentacaoService: MovimentacaoService,
    private frenteServicoService: FrenteServicoService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute) { }




  ngOnInit(): void {
    this.getId();

    this.frm = this.formBuilder.group({
      data: ['', [Validators.required]],
      tipoMovimentacao: [0, Validators.required],
      qtd: ['', Validators.required],
      produtoId: ['', Validators.required],
      frenteServicoId: ['', Validators.required]
    })

    if (this.movimentacaoId) {
      this.isEdit = true;
      this.movimentacaoService.getById(Number(this.movimentacaoId)).subscribe({
        next: (data) => {

          console.log(data)
          this.movimentacaoEdit = data.resultado as Movimentacao

          this.frm.patchValue({
            data: this.movimentacaoEdit.data,
            tipoMovimentacao: (this.movimentacaoEdit.tipoMovimentacao),
            qtd: this.movimentacaoEdit.qtd,
            produtoId: this.movimentacaoEdit.produtoId,
            frenteServicoId: this.movimentacaoEdit.frenteServicoId,
          })

          console.log('Tipo de Movimentação após patchValue:', this.frm.get('tipoMovimentacao')?.value);
        }
      })
    }

    this.produtoService.getAll().subscribe({
      next: (data) => {
        this.produtos = data.resultado;
      }
    })

    this.frenteServicoService.getAll().subscribe({
      next: (data) => {
        this.frenteServicos = data.resultado;
      }
    })
  }



  onSubmit() {
    if (this.movimentacaoId) {
      this.movimentacaoService.edit(Number(this.movimentacaoId), this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/movimentacao');
        },
        error: (error) => {
          showMessage('Erro', 'error', error.error.mensagem, false, this.router, undefined, '/add-or-edit-movimentacao/' + this.movimentacaoId);
        }
      })
    } else {
      this.movimentacaoService.add(this.frm.value).subscribe({
        next: (data) => {
          showMessage('Sucesso', 'success', 'Operação realizada com sucesso.', false, this.router, undefined, '/movimentacao');
        },
        error: (error) => {
          showMessage('Erro', 'error', error.error.mensagem, false, this.router, undefined, '/add-or-edit-movimentacao/');
        }
      })
    }
  }

  
  getId(): Boolean {
    let hasId = false;
    this.route.paramMap.subscribe(params => {
      if (params.get('id?')) {
        this.movimentacaoId = params.get('id?')
        hasId = true;
      } else {
        hasId = false;
      }
    })
    return hasId;
  }
}
