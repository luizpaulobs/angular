import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalcardComponent } from './totalcard.component';

describe('TotalcardComponent', () => {
  let component: TotalcardComponent;
  let fixture: ComponentFixture<TotalcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
