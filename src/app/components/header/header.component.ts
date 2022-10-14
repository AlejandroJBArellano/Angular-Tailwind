import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public declare today: string;
  public declare currentRoute: string;

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      this.currentRoute =
        event && event.url ? event.url.replace('/', '') : this.currentRoute;
    });
  }

  ngOnInit(): void {
    this.today = new Date().toString();
  }
}
