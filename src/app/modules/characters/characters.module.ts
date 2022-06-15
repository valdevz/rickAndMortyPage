import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { DetailsComponent } from './details/details.component';
import { GetIdPipe } from '../../pipes/get-id.pipe';

@NgModule({
  declarations: [
    CharactersComponent,
    DetailsComponent,
    GetIdPipe,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
  ]
})
export class CharactersModule { }
