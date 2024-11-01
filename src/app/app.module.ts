import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


// Angular Material
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProdutoComponent } from './components/pages/produto/produto.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutoAddOrEditComponent } from './components/pages/produto-add-or-edit/produto-add-or-edit.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { EstoqueComponent } from './components/pages/estoque/estoque.component';
import { EstoqueAddOrEditComponent } from './components/pages/estoque-add-or-edit/estoque-add-or-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FrenteServicoComponent } from './components/pages/frente-servico/frente-servico.component';
import { FrenteServicoAddOrEditComponent } from './components/pages/frente-servico-add-or-edit/frente-servico-add-or-edit.component';
import { MovimentacaoComponent } from './components/pages/movimentacao/movimentacao.component';
import { MovimentacaoAddOrEditComponent } from './components/pages/add-or-edit-movimentacao/movimentacao-add-or-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    HomeComponent,
    ButtonComponent,
    HeaderComponent,
    ProdutoAddOrEditComponent,
    LoginComponent,
    EstoqueComponent,
    EstoqueAddOrEditComponent,
    FrenteServicoComponent,
    FrenteServicoAddOrEditComponent,
    MovimentacaoComponent,
    MovimentacaoAddOrEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),

    // Angular Material
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDividerModule,
    MatBadgeModule,


    NgChartsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
