import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleSlotComponent } from './modale-slot.component';

describe('ModaleSlotComponent', () => {
  let component: ModaleSlotComponent;
  let fixture: ComponentFixture<ModaleSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
