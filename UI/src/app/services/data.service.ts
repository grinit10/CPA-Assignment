import { Observable } from 'rxjs';
import { ReadService } from './read.service';

export class DataService {

  constructor(
    public readService: ReadService,
    public url: string) {}

  getAll = <T1>(queryObject: any): Observable<T1> => {
    return this.readService.readAll(queryObject, this.url);
  }
}
