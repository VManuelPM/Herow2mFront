import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { HeroesModel } from '../../models/heroes.model';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardComponent } from '../heroe-card/heroe-card.component';
import { HeroesFormService } from '../../services/heroes-form.service';
import { ModalConfirmationComponent } from 'src/app/core/shared/components/modal-confirmation/modal-confirmation.component';
import { ModalSucessComponent } from 'src/app/core/shared/components/modal-sucess/modal-sucess.component';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroesTableComponent implements OnInit {
  public heroes: HeroesModel[];
  public displayedColumns: string[] = [
    'id',
    'heroeName',
    'heroeImage',
    'action',
  ];
  public dataSource!: MatTableDataSource<HeroesModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private heroesService: HeroesService,
    private heroesFormService: HeroesFormService,
    private dialog: MatDialog
  ) {
    this.heroes = [];
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService
      .getHeroes()
      .toPromise()
      .then(
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

  applyFilter(search: string) {
    if (!search) {
      this.getHeroes();
      return;
    }
    //Not number
    if (isNaN(+search)) {
      this.dataSource.filter = this.heroesService.getHeroeLike(
        this.dataSource,
        search
      );
    } else {
      this.heroesService
        .getHeroe(Number(search))
        .toPromise()
        .then(
          (res) => {
          this.dataSource.filter = res.heroeName;
        }, 
        err=>{
          this.dataSource = new MatTableDataSource();
        }
        );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreate() {
    this.heroesFormService.createFormGroup();
    this.dialog
      .open(HeroeCardComponent, this.dialogConfigs())
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.dialog.open(ModalSucessComponent);
          this.getHeroes();
        }
      });
  }

  onEdit(row: HeroesModel) {
    this.heroesFormService.setValueForm(row);
    this.dialog
      .open(HeroeCardComponent, this.dialogConfigs())
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.dialog.open(ModalSucessComponent);
          this.getHeroes();
        }
      });
  }

  onDelete(id: number) {
    this.dialog
      .open(ModalConfirmationComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.heroesService
            .deleteHeroe(id)
            .toPromise()
            .then((res) => {
              if (res) {
                this.dialog.open(ModalSucessComponent);
                this.getHeroes();
              }
            });
        }
      });
  }

  dialogConfigs(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    return dialogConfig;
  }
}
