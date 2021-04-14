import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {Store} from '@ngxs/store';
import { SubjectResult } from 'src/app/models/subjectResult.model';
import { SubjectResultService } from 'src/app/services/subjectResult.service';
import { AddSubjectResult, GetSubjectResult } from '../actions/subjectResult.actions';

export class SubjectResultStateModel {
    items: SubjectResult[] = [];
    isLoading = false;
}

@State<SubjectResultStateModel>({
    name: 'subjectResults',
    defaults: {
        items: [],
        isLoading: false
    }
})

@Injectable()
export class  SubjectResultState {

    constructor(private subjectResultService: SubjectResultService, private store: Store) {
    }

    @Selector()
    static getSubjectResults(state: SubjectResultStateModel): SubjectResult[] {
        return state.items;
    }

    @Action(GetSubjectResult)
    GetSubjectResult({ getState, setState }: StateContext<SubjectResultStateModel>): void {
        const state = getState();
        setState({
            ...state,
            isLoading: true,
        });
        this.subjectResultService.getSubjectResults().pipe(tap((result: SubjectResult[]) => {
            this.store.dispatch(new AddSubjectResult(result));
        })).subscribe();
    }

    @Action(AddSubjectResult)
    AddSubjectResult({ getState, patchState }: StateContext<SubjectResultStateModel>, { payload }: AddSubjectResult): void {
        const state = getState();
        patchState({
            items: [...state.items, ...payload],
            isLoading: false,
        });
    }
}

