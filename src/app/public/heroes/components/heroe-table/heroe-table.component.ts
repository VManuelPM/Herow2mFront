import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { HeroesModel } from '../../models/heroes.model';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardComponent } from '../heroe-card/heroe-card.component';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroesTableComponent implements OnInit {
  public heroes: HeroesModel[];
  public displayedColumns: string[] = ['id', 'heroeName', 'heroeImage', 'action'];
  public dataSource!: MatTableDataSource<HeroesModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private heroesService: HeroesService, private dialog: MatDialog) {
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

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%'
    this.dialog.open(HeroeCardComponent, dialogConfig);
  }

}
