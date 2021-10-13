import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HeroesModel } from '../../models/heroes.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroesTableComponent implements OnInit {
  public heroes: HeroesModel[];
  public displayedColumns: string[] = ['idHeroe', 'heroeName', 'heroeImage'];
  public dataSource !: MatTableDataSource<HeroesModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroesService: HeroesService) {
    this.heroes = [];
    this.getHeroes();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  getHeroes(): void {
    this.heroesService.getHeroes().subscribe(
      (res) => {
        this.heroes = res;
        this.dataSource = new MatTableDataSource(this.heroes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
