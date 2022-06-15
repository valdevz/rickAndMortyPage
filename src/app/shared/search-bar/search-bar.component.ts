import { Component, OnInit } from '@angular/core';
import { SearchBarService } from 'src/app/services/searchBar/search-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchValue: string = '';
  constructor(private searchBarService: SearchBarService,
              private router: Router) {
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
              }

  showComponent: Boolean = true;
  cleanSearchBar: Boolean = false;

  ngOnInit(): void {

    this.searchBarService.cleanValue.subscribe(res => {
      this.cleanSearchBar = res;
      if(this,this.cleanSearchBar){
        this.searchValue  = '';
      }
    })
    this.searchBarService.showSearchBar.subscribe(res => this.showComponent = res)
  }

  search(event: Event):void{
    this.searchBarService.wordToSearch.next(event.target['value'])
  }
}
