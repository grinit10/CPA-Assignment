import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FilteredSubjectResult } from './models/filteredSubjectResult.model';
import { SubjectResult } from './models/subjectResult.model';
import { GetSubjectResult } from './store/actions/subjectResult.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  filteredSubjectResults: FilteredSubjectResult[] = [];
  isLoading = true;


  constructor(public store: Store) {
    this.store.select(state => state.subjectResults.items).subscribe((r: SubjectResult[]) => {
      this.createFilteredSubjectResult(r);
    });

    this.store.select(state => state.subjectResults.isLoading).subscribe((r: boolean) => {
      this.isLoading = r;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetSubjectResult());
  }

  createFilteredSubjectResult = (subjectResults: SubjectResult[]): void => {
    const filteredResults: FilteredSubjectResult[] = [];
    subjectResults.map(sr => {
      sr.results.filter(r => r.grade.toLocaleLowerCase() === 'pass').map(r => {
        const selectedFiltedResult = filteredResults.find(fr => fr.year === r.year);
        if (!!selectedFiltedResult) {
          selectedFiltedResult.subjects.push(sr.subject);
        } else {
          filteredResults.push({
            year: r.year,
            subjects: [sr.subject]
          });
        }
      });
    });

    this.filteredSubjectResults = filteredResults.sort((a, b) => a.year > b.year ? 1 : -1);
  }

}
