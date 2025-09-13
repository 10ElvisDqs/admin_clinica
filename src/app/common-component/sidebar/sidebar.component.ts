import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DataService } from 'src/app/shared/data/data.service';
import { MenuItem, SideBarData } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  base = '';
  page = '';
  currentUrl = '';
  public classAdd = false;

  public multilevel: Array<boolean> = [false, false, false];

  public routes = routes;
  public sidebarData: Array<SideBarData> = [];
  public user:any;
  constructor(
    private data: DataService,
    private router: Router,
    private sideBar: SideBarService,
    public authService: AuthService,
  ) {
    // this.user = this.authService.user;
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER : '');
    // INICIO
    if(this.user && this.user.roles.includes("Super-Admin")){
      this.sidebarData = this.data.sideBar;
    }else{
      // VAMOS A FILTRAR Y VALIDAR QUE OPCIONES PUEDE VER ESE ROL
      let permissions = this.user.permissions;

      let SIDE_BAR_G:any = [];
      this.data.sideBar.forEach((side:any) => {
        let SIDE_B:any = [];
        side.menu.forEach((menu_s:any) => {
          if(menu_s.subMenus.length > 0){
            let SUB_MENUS = menu_s.subMenus.filter((submenu:any) => permissions.includes(submenu.permision) && submenu.show_nav);
            if(SUB_MENUS.length > 0){
              menu_s.subMenus = SUB_MENUS;
              SIDE_B.push(menu_s);
            }
          }else{
            if(permissions.includes(menu_s.permision)){
              menu_s.subMenus = [];
              SIDE_B.push(menu_s);
            }
          }
        });
        if(SIDE_B.length > 0){
          side.menu = SIDE_B;
          SIDE_BAR_G.push(side);
        }
      })
      this.sidebarData = SIDE_BAR_G;
    }

    // FIN
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
  }

  public expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.sidebarData.map((mainMenus: SideBarData) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }
  private getRoutes(route: { url: string }): void {
    const bodyTag = document.body;

    bodyTag.classList.remove('slide-nav')
    bodyTag.classList.remove('opened')
    this.currentUrl = route.url;

    const splitVal = route.url.split('/');


    this.base = splitVal[1];
    this.page = splitVal[2];
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

}
