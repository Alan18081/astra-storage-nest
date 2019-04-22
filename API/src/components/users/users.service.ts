import {CreateUserDto} from '@astra/common/dto';
import {IUser} from '@astra/common/entities';
import {Observable} from 'rxjs/internal/Observable';

export interface UsersService {
    createOne(dto: CreateUserDto): Observable<IUser>
}