import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  wordToSearch: Subject<string>;
  showSearchBar: Subject<boolean>;
  cleanValue: Subject<boolean>
  constructor() { 
    this.wordToSearch = new Subject<string>();
    this.showSearchBar = new Subject<boolean>();
    this.cleanValue = new Subject<boolean>();
  }
}
