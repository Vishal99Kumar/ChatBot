import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDataComponent } from './tile-data.component';

describe('TileDataComponent', () => {
  let component: TileDataComponent;
  let fixture: ComponentFixture<TileDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TileDataComponent]
    });
    fixture = TestBed.createComponent(TileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
