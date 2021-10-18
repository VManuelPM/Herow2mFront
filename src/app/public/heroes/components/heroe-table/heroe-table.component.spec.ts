import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ModalConfirmationModule } from 'src/app/core/shared/components/modal-confirmation/modal-confirmation.module';
import { ModalSucessComponent } from 'src/app/core/shared/components/modal-sucess/modal-sucess.component';
import { ModalSucessModule } from 'src/app/core/shared/components/modal-sucess/modal-sucess.module';
import { HeroesModel } from '../../models/heroes.model';
import { HeroesFormService } from '../../services/heroes-form.service';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardModule } from '../heroe-card/heroe-card.module';
import { HeroesTableComponent } from './heroe-table.component';

describe('HeroeTableComponent', () => {
  let component: HeroesTableComponent;
  let fixture: ComponentFixture<HeroesTableComponent>;
  let heroesService: jasmine.SpyObj<HeroesService>;
  let heroesFormService: jasmine.SpyObj<HeroesFormService>;
  let heroes: HeroesModel[];
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesTableComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        ModalConfirmationModule,
        ModalSucessModule,
        HeroeCardModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
          isolate: true
        }),
      ],
      providers: [
        HeroesFormService,
        MatPaginator,
        MatSort,
        { MatDialog, useValue: {} },
        TranslateService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesTableComponent);
    component = fixture.componentInstance;
    MockBuilder(HeroesTableComponent, MatTableModule);

    heroesService = TestBed.inject(
      HeroesService
    ) as jasmine.SpyObj<HeroesService>;

    heroesFormService = TestBed.inject(
      HeroesFormService
    ) as jasmine.SpyObj<HeroesFormService>;

    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    heroes = [
      {
        id: 1,
        heroeName: 'test',
        heroeDescription: 'test',
        heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
      },
    ];

    component.dataSource = new MatTableDataSource(heroes);
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = MockRender(HeroesTableComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });

  it('Should test table', () => {
    // Rendering TargetComponent and accessing its instance.
    const targetComponent =
      MockRender(HeroesTableComponent).point.componentInstance;
    //Looking for a debug element of `MatTable`.
    const tableEl = ngMocks.reveal(['mat-table']);
    //Asserting bound properties.
    expect(ngMocks.input(tableEl, 'dataSource')).toBe(
      targetComponent.dataSource
    );
  });

  it('should get datasource', () => {
    const heroesServiceSpy = spyOn(
      heroesService,
      'getHeroes'
    ).and.callThrough();
    const componentSpy = spyOn(component, 'getHeroes').and.callThrough();
    expect(heroesServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();
    component.getHeroes();
    expect(heroesServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should apply filter by id', () => {
    const heroesServiceSpy = spyOn(heroesService, 'getHeroe').and.callThrough();
    const componentSpy = spyOn(component, 'applyFilter').and.callThrough();
    component.applyFilter('1');
    fixture.detectChanges();
    expect(heroesServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(component.dataSource).not.toBeNull();
      expect(component.dataSource.data).toEqual(heroes);
    });
  });

  it('should apply filter by name', () => {
    const heroesServiceSpy = spyOn(
      heroesService,
      'getHeroeLike'
    ).and.callThrough();
    const componentSpy = spyOn(component, 'applyFilter').and.callThrough();
    component.applyFilter('t');
    expect(heroesServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should apply filter fail', () => {
    const componentSpy = spyOn(component, 'applyFilter').and.callThrough();
    component.applyFilter('');
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(component.applyFilter('')).toBeNull;
  });

  it('should onCreate', () => {
    const heroesFormServiceSpy = spyOn(
      heroesFormService,
      'createFormGroup'
    ).and.callThrough();
    const dialogSpy = spyOn(dialog, 'open').and.callThrough();
    const componentSpy = spyOn(component, 'onCreate').and.callThrough();
    component.onCreate();
    fixture.detectChanges();
    expect(heroesFormServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(dialogSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should onEdit', () => {
    let heroe = {
      id: 1,
      heroeName: 'testEdit',
      heroeDescription: 'testEdit',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };
    const heroesFormServiceSpy = spyOn(
      heroesFormService,
      'setValueForm'
    ).and.callThrough();
    const componentSpy = spyOn(component, 'onEdit').and.callThrough();
    const dialogSpy = spyOn(dialog, 'open').and.callThrough();
    component.onEdit(heroe);
    fixture.detectChanges();
    expect(heroesFormServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  it('should onDelete', () => {
    const heroesServiceSpy = spyOn(
      heroesService,
      'deleteHeroe'
    ).and.callThrough();
    const componentSpy = spyOn(component, 'onDelete').and.callThrough();
    const dialogSpy = spyOn(dialog, 'open').and.callThrough();
    component.onDelete(1);
    fixture.detectChanges();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      expect(dialogSpy).toHaveBeenCalledTimes(2);
      expect(heroesServiceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
