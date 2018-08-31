import { HomePage } from './pages/home/home';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, NavigationStart, NavigationError } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { FuncionarioPage } from './pages/funcionario/funcionario-cadastro';
import { EmpresaPage } from './pages/empresa/empresa-cadastro';
import { AuthLayoutComponent } from './pages/auth/auth-layout.component';

// const routes: Routes = [

// { path: '', component: HomePage },
// { path: 'login', component: LoginPage},
// { path: 'empresa', component : EmpresaPage },
// { path: 'funcionario', component : FuncionarioPage}

// ];

// @NgModule({
//   exports: [RouterModule],
//   imports: [RouterModule.forRoot(routes)],
// })
// export class AppRoutingModule { 
// }
export const baseRoutes: Routes = [
  {
      path: '',
      component: AuthLayoutComponent,
      children: [
          { path: 'home', component: HomePage },
          { path: 'login', component: LoginPage},
          { path: 'empresa', component : EmpresaPage },
          { path: 'funcionario', component : FuncionarioPage}
      ]
  },
  {
      path: '',
      component: AuthLayoutComponent,
      children: [{
          path: 'login',
          component: LoginPage
      }]
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(baseRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class BaseRoute {
  constructor(router: Router) {
      router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
              const token = sessionStorage.getItem('idEmpresa');
              if (token == null && event.url !== '/login') {
                  router.navigate(['login']);
              } else if (token != null && event.url === '/') {
                  router.navigate(['/home']);
              }
          } else if (event instanceof NavigationError) {
              router.navigate(['/home']);
          }
      });
  }
}
