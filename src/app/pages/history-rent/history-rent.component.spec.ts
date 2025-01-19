import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRentComponent } from './history-rent.component';

describe('HistoryRentComponent', () => {
  let component: HistoryRentComponent;
  let fixture: ComponentFixture<HistoryRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
