import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { SearchBarService } from 'src/app/services/searchBar/search-bar.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  
  result = {}
  filter: Array<number> = []
  showInLayout = {}
  searchWord: Subscription;
  word2Search: string = '';
  constructor(private apiService: APIService,
              private searchBarService: SearchBarService,
              private sharedService: SharedService) {
    this.searchBarService.showSearchBar.next(true);
    this.apiService.getCharacters()
    .subscribe(res => {
      this.result = res.results;
      this.showInLayout= JSON.parse(JSON.stringify(this.result));
    })
  }
  
  ngOnInit(): void {
    this.searchWord = this.searchBarService.wordToSearch
    .subscribe( word => {
      this.word2Search = word;
      if(this.word2Search.length == 0){
        this.showInLayout = this.result
      }else {
        this.filter= JSON.parse(JSON.stringify(this.result));
        this.findWord(this.filter, this.word2Search)
      }
    } )
  }

  findWord(resultObject: Object, filter: string): void{
    let avoidKeys: Array<string> = ['episode','location', 'origin', 'url', 'image', 'type', 'created']
    this.filter = this.sharedService.findWord(resultObject, filter, avoidKeys);
    if(Object.values(this.filter).length == 0 ){
      this.showInLayout = this.result
    }else {
      this.showResults(this.filter);
    }
  }
  showResults(ids: Array<any>){
    let arrData = Object.values(this.result)
    let finalObj: Array<any> = [];
    let idsArr = Object.values(Object.fromEntries(ids.map(({ id }) => [id, id])))
    for (let i = 0; i < arrData.length; i++) {
      if(idsArr.includes(arrData[i]['id'])){
        finalObj.push(arrData[i]);
      }
    }
    this.showInLayout = finalObj;
  }

  ngOnDestroy():void { 
    this.searchWord.unsubscribe();
    this.searchBarService.cleanValue.next(true)
  }

}
