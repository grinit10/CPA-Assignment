import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadService } from './read.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectResult } from '../models/subjectResult.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectResultService extends DataService {

    constructor(public readService: ReadService,
                public http: HttpClient) {
        super(readService, `${environment.apiBaseUri}/results`);
    }

    getSubjectResults = (): Observable<SubjectResult[]> =>
        this.readService.readAll<SubjectResult[]>(null, this.url)
}
