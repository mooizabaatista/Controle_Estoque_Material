import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'controle-estoque-app';
  isMobile$!: Observable<boolean>;
  sidebarOpened: boolean = false
  isLoginOrRegisterPage: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoginOrRegisterPage = this.checkIfLoginOrRegisterPage();
      });
  }

  checkIfLoginOrRegisterPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('login') || currentUrl.includes('register');
  }

  logout() {
    let token = localStorage.getItem('token_app');

    if (token !== null) {
      this.sidebarOpened = false;
      localStorage.removeItem('token_app')
      this.router.navigate(['login'])
    }
  }
}

