import { SubjectResult } from 'src/app/models/subjectResult.model';

export class GetSubjectResult {
    static readonly type = '[SUBJECTRESULT] Get';

    constructor() { }
}

export class AddSubjectResult {
    static readonly type = '[SUBJECTRESULT] Add';

    constructor(public payload: SubjectResult[]) {
    }
}
