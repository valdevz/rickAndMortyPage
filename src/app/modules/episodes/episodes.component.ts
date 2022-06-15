import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';
import { SearchBarService } from 'src/app/services/searchBar/search-bar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit, OnDestroy {
  result?: Object;
  searchWord: Subscription;
  word2Search: string = '';
  filter: Array<number> = []
  showInLayout = {}
  constructor(private apiService: APIService,
              private sharedService: SharedService,
              private searchBarService: SearchBarService) {
    this.apiService.getEpisodes()
      .subscribe((res:any) => {
        this.searchBarService.showSearchBar.next(true);
        this.result = res.results
        this.showInLayout= JSON.parse(JSON.stringify(this.result));
      })
  }

  ngOnInit(): void {
    this.searchWord = this.searchBarService.wordToSearch
    .subscribe( word => {
      this.word2Search = word;
      if(this.word2Search.length == 0){
        this.showInLayout = this.result;
      }else {
        this.filter= JSON.parse(JSON.stringify(this.result));
        this.findWord(this.filter, this.word2Search)
      }
    } )
  }

  findWord(resultObject: Object, filter: string): void{
    let avoidKeys: Array<string> = ['characters','created', 'url']
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

  getMultiplesIds(characters: Array<string>): void{
    let allCharacters = this.sharedService.getMultiplesIds(characters)
    this.getMultipleCharacters(allCharacters)
  }

  getMultipleCharacters(ids: string): void{
    this.apiService.getMultipleCharacters(ids)
    .subscribe(res => {
      let htmlContent = [];
      for (let i = 0; i < res.length; i++) {
        const name = res[i]['name'];
        htmlContent.push(`<li style="text-align: left;"><p style="margin-left: 10px;" class="d-inline-block">${name}</p></li>`)
      }
      this.modalSwal(htmlContent.join(''))
    })
  }

  modalSwal(htmlContent): void{
    Swal.fire('List of characters for this episode', `<div><ol>${htmlContent}</ol></div>`)
  }


  ngOnDestroy():void {
    this.searchWord.unsubscribe();    
  }

}
