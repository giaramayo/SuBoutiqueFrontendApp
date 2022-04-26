import { NgModule } from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  exports: [
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatMenuModule,
    MatCardModule
  ]
})
export class MaterialModule { }
