import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

export class FirebaseRequestInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Preparing request', request);
        return next.handle(request).do(httpEvent => {
            (<any>httpEvent).typeUnravelled = HttpEventType[httpEvent.type];
            console.log('Logging HttpEvent', httpEvent);
        });
    }
}