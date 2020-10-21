import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlayerNameComponent } from './dialog-player-name.component';

describe('DialogPlayerNameComponent', () => {
  let component: DialogPlayerNameComponent;
  let fixture: ComponentFixture<DialogPlayerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlayerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPlayerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
