import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovermodalComponent } from './removermodal.component';

describe('RemovermodalComponent', () => {
  let component: RemovermodalComponent;
  let fixture: ComponentFixture<RemovermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
