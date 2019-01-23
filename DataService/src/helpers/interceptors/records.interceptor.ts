import {ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class RecordsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        return call$
            .pipe(map(data => {
                if (!data) {
                    return data;
                }
                if (Array.isArray(data)) {
                    return data.map(item => ({ id: item.id, ...item.data }));
                } else {
                    return { id: data.id, ...data.data };
                }
            }));
    }
}