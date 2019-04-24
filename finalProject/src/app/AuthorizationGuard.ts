
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        var token = localStorage.getItem('token');
        var user = localStorage.getItem('user');
        if (!token || !user) {
            this.router.navigate(['login']);
        }
        if (route && route.url.length > 0 && route.url[0].path === 'users') {
          const  userParsed : any = JSON.parse(user);
            if (userParsed.role != 'admin') {
                this.router.navigate(['login']);
            }
        }
        return true;
    }

}