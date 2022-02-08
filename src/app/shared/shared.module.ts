import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  exports:[
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
