import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';
import { HeroesModel } from '../models/heroes.model';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpClientSpy: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroesService,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient),
        },
      ],
      declarations: [],
    });
    service = TestBed.inject(HeroesService);
    httpClientSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test getHeroes()
  it('should return heroes (HttpClient called once)', (done: DoneFn) => {
    const expectedHeores: HeroesModel[] = [
      {
        id: 1,
        heroeName: 'test',
        heroeDescription: 'test',
        heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedHeores));

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeores, 'expected heroes');
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  //test getHeroes(id)
  it('should return heroe by Id', (done: DoneFn) => {
    const expectedHeore: HeroesModel = {
      id: 1,
      heroeName: 'test',
      heroeDescription: 'test',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };
    httpClientSpy.get.and.returnValue(of(expectedHeore));

    service.getHeroe(1).subscribe((heroe) => {
      expect(heroe).toEqual(expectedHeore);
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  //test saveHeroe()
  it('should save heroe', (done: DoneFn) => {
    const newHeroe: HeroesModel = {
      heroeName: 'test',
      heroeDescription: 'test',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };

    httpClientSpy.post.and.nextWith(newHeroe);

    service.saveHeroe(newHeroe).subscribe((heroe) => {
      expect(heroe).toEqual(newHeroe);
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  //test updateHeroe()
  it('should update heroe', (done: DoneFn) => {
    const updateHeroe: HeroesModel = {
      id: 1,
      heroeName: 'testUpdate',
      heroeDescription: 'testUpdated',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };

    httpClientSpy.put.and.nextWith(updateHeroe);

    service.updateHeroe(updateHeroe).subscribe((heroe) => {
      expect(heroe).toEqual(updateHeroe);
      done();
    }, done.fail);

    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  //test deleteHeroe
  it('should delete heroe', (done: DoneFn) => {
    const updateHeroe: HeroesModel = {
      id: 1,
      heroeName: 'testUpdate',
      heroeDescription: 'testUpdated',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };

    httpClientSpy.delete.and.nextWith(
      new HttpResponse({
        status: 200,
      })
    );

    service.deleteHeroe(1).subscribe((res) => {
      expect(res.status).toEqual(200);
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });
});
