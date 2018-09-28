import { HomePage } from './pages/home/home';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatButtonModule,  MatIconModule, MatTooltipModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatListModule, MatBottomSheetModule, MatCardModule, MatExpansionModule, MatToolbarModule, MatTableModule, MatSliderModule, MatSlideToggleModule, MatSelectModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule, MatAutocompleteModule, MatDatepickerModule, MatDatepickerToggle, MatNativeDateModule, MAT_DATE_LOCALE, MatSpinner, MatProgressSpinner, MatProgressSpinnerModule, MatSidenavModule, MatGridListModule, MatPaginatorModule} from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPage } from './pages/login/login';
import { BrMasker4Module } from 'brmasker4';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FuncionarioPage } from './pages/funcionario/funcionario-cadastro';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EmpresaPage } from './pages/empresa/empresa-cadastro';
import { BaseRoute } from './app-routing.module';
import { AuthLayoutComponent } from './pages/auth/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    EmpresaPage,
    FuncionarioPage,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    BaseRoute,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatBottomSheetModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrMasker4Module,
    FormsModule,
    HttpModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxChartsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000},},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
