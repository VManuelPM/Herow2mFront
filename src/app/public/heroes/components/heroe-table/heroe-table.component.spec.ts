import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesFormService } from '../../services/heroes-form.service';

import { HeroesTableComponent } from './heroe-table.component';

describe('HeroeTableComponent', () => {
  let component: HeroesTableComponent;
  let fixture: ComponentFixture<HeroesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesTableComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule
      ],
      providers: [HeroesFormService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
