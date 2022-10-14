import { Component, OnInit } from '@angular/core';

const routes: { path: string; show: string }[] = [
  {
    path: '/Angular-Tailwind/dashboard',
    show: 'Dashboard',
  },
  {
    path: '/Angular-Tailwind/portfolio',
    show: 'Portafolio Value',
  },
  {
    path: '/Angular-Tailwind/balances',
    show: 'Balances',
  },
  {
    path: '/Angular-Tailwind/actions',
    show: 'Actions',
  },
  {
    path: '/Angular-Tailwind/movements',
    show: 'Movements',
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
