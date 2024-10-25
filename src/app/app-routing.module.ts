import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/pages/produto/produto.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProdutoAddOrEditComponent } from './components/pages/produto-add-or-edit/produto-add-or-edit.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { AdminGuard } from './Auth/admin.guard';
import { EstoqueComponent } from './components/pages/estoque/estoque.component';
import { EstoqueAddOrEditComponent } from './components/pages/estoque-add-or-edit/estoque-add-or-edit.component';
import { FrenteServicoComponent } from './components/pages/frente-servico/frente-servico.component';
import { FrenteServicoAddOrEditComponent } from './components/pages/frente-servico-add-or-edit/frente-servico-add-or-edit.component';
import { MovimentacaoComponent } from './components/pages/movimentacao/movimentacao.component';
import { MovimentacaoAddOrEditComponent } from './components/pages/add-or-edit-movimentacao/movimentacao-add-or-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // Produto
  { path: 'produtos', component: ProdutoComponent, canActivate: [AuthGuard]},
  { path: 'add-or-edit-produto', component: ProdutoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-or-edit-produto/:id?', component: ProdutoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  // Estoque
  { path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard]},
  { path: 'add-or-edit-estoque', component: EstoqueAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-or-edit-estoque/:id?', component: EstoqueAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  // Frente de Serviço
  { path: 'frente-servico', component: FrenteServicoComponent, canActivate: [AuthGuard]},
  { path: 'add-or-edit-frente-servico', component: FrenteServicoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-or-edit-frente-servico/:id?', component: FrenteServicoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  //Movimentacao
  { path: 'movimentacao', component: MovimentacaoComponent, canActivate: [AuthGuard]},
  { path: 'add-or-edit-movimentacao', component: MovimentacaoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-or-edit-movimentacao/:id?', component: MovimentacaoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
