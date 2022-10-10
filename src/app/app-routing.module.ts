import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ActionsComponent } from './components/actions/actions.component';
import { MovementsComponent } from './components/movements/movements.component';
import { BalancesComponent } from './components/balances/balances.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'actions',
    component: ActionsComponent,
  },
  {
    path: 'movements',
    component: MovementsComponent,
  },
  {
    path: 'balances',
    component: BalancesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
