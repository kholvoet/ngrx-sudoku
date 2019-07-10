import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuInternalsComponent } from './sudoku-internals.component';

describe('SudokuInternalsComponent', () => {
  let component: SudokuInternalsComponent;
  let fixture: ComponentFixture<SudokuInternalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudokuInternalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuInternalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
