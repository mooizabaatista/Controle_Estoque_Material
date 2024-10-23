import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/pages/produto/produto.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'produtos', component: ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
