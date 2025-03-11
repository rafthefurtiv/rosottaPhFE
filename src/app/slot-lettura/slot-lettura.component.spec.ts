import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotLetturaComponent } from './slot-lettura.component';

describe('SlotLetturaComponent', () => {
  let component: SlotLetturaComponent;
  let fixture: ComponentFixture<SlotLetturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotLetturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotLetturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
