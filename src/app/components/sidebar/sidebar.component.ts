import { Component, OnInit } from '@angular/core';

const routes: { path: string; show: string }[] = [
  {
    path: '/dashboard',
    show: 'Dashboard',
  },
  {
    path: '/portfolio',
    show: 'Valor de Portafolio',
  },
  {
    path: '/balances',
    show: 'Saldos',
  },
  {
    path: '/actions',
    show: 'Acciones',
  },
  {
    path: '/movements',
    show: 'Movimientos',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public declare publicRoutes: { path: string; show: string }[];
  constructor() {}

  ngOnInit(): void {
    this.publicRoutes = routes;
  }
}
