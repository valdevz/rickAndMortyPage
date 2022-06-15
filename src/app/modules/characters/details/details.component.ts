import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { SearchBarService } from 'src/app/services/searchBar/search-bar.service';

interface Character {
  created: String,
  episode: Array<String>,
  gender: String
  id: Number
  image: String
  location: {
    name: String,
    url: String
  }
  name: String
  origin: {
    name: String,
    url: String
  }
  species: String
  status: String
  type: String
  url: String
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id : number | null = null;
  constructor(private route: ActivatedRoute,
              private apiService: APIService,
              private searchBarService: SearchBarService) { 
    this.searchBarService.showSearchBar.next(false);
    this.id = Number(this.route.snapshot.paramMap.get('id'))
  }

  result?: Character;

  ngOnInit(): void {
    if(typeof this.id == 'number'){
      this.apiService.getIndividualCharacter(this.id)
      .subscribe(res => this.result = res);
    }
  }

}
