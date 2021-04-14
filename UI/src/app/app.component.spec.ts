import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AppComponent } from './app.component';
import { SubjectResultState } from './store/state/subjectResult.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgxsModule.forRoot([SubjectResultState]),
      ],
      declarations: [
        AppComponent
      ],
      providers: []
    }).compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      subjectResults: {
        isloading: false,
        items: []
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty filtered subject result when state is empty`, () => {
    component.createFilteredSubjectResult([]);
    expect(component.filteredSubjectResults).toHaveSize(0);
  });

  it(`should return non-empty filtered subject result when state is empty`, () => {
    component.createFilteredSubjectResult([{subject: 'Strategic Management Accounting',
      results: [{year: 2015, grade: 'FAIL'},
      {year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Reporting',
      results: [{year: 2015, grade: 'FAIL'},
      {year: 2016, grade: 'PASS'}]},
      {subject: 'Advanced Taxation',
      results: [{year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Risk Management',
      results: [{year: 2015, grade: 'PASS'}]},
      {subject: 'Advanced Audit and Assurance',
       results: [{year: 2015, grade: 'PASS'}]}]);
    expect(component.filteredSubjectResults).toHaveSize(2);
  });

  it(`should return sorted non-empty filtered subject result when state is empty`, () => {
    component.createFilteredSubjectResult([{subject: 'Strategic Management Accounting',
      results: [{year: 2015, grade: 'FAIL'},
      {year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Reporting',
      results: [{year: 2015, grade: 'FAIL'},
      {year: 2016, grade: 'PASS'}]},
      {subject: 'Advanced Taxation',
      results: [{year: 2016, grade: 'PASS'}]},
      {subject: 'Financial Risk Management',
      results: [{year: 2015, grade: 'PASS'}]},
      {subject: 'Advanced Audit and Assurance',
       results: [{year: 2015, grade: 'PASS'}]}]);
    expect(component.filteredSubjectResults[0].year).toEqual(2015);
  });

  it('should update store on init', () => {
    component.ngOnInit();
    expect(store.selectSnapshot(state => state.subjectResults.isLoading)).toEqual(true);
  });
});
