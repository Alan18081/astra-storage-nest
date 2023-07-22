import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {mapStorageRecord} from '../utils/map-storage-record';

@Injectable()
export class RecordsInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle()
            .pipe(map(data => {
                if (Array.isArray(data)) {
                  return data.map(mapStorageRecord);
                }
                if (data) {
                    return mapStorageRecord(data);
                }
            }));
    }
}
