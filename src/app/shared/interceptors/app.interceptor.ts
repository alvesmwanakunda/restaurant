import { Injectable,Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { environment } from "src/environments/environment";

@Injectable()
export class AppInterceptor implements HttpInterceptor{
   private headers: HttpHeaders;

    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith("/assets")) {
            // serve assets directly
            return next.handle(req);
        }
        let token = this.authService.getToken();
        console.log("User interceptor", token);
        if (token && token.token) {
            console.log("Token", token.token);
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token.token}` }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401 || error.status == 403) {
                    this.authService.logout();
                    this.router.navigate(["login"]);
                }
                return throwError(error);
            })
        );
    }
}
