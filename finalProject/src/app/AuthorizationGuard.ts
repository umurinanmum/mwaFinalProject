
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


export class AuthorizationGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        var token = localStorage.getItem('token');
        var user = localStorage.getItem('user');
        if (!token || !user) {
            this.router.navigate(['login']);
        }
        return true;
    }

}