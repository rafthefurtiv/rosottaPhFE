import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSlotComponent } from './lista-slot.component';

describe('ListaSlotComponent', () => {
  let component: ListaSlotComponent;
  let fixture: ComponentFixture<ListaSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
