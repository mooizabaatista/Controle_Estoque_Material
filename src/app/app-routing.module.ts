import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/pages/produto/produto.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProdutoAddOrEditComponent } from './components/pages/produto-add-or-edit/produto-add-or-edit.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { AdminGuard } from './Auth/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'produtos', component: ProdutoComponent, canActivate: [AuthGuard]},
  { path: 'add-or-edit-produto', component: ProdutoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'add-or-edit-produto/:id?', component: ProdutoAddOrEditComponent, canActivate: [AuthGuard, AdminGuard] },
  
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
