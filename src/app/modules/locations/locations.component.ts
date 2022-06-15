import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { SearchBarService } from 'src/app/services/searchBar/search-bar.service';
import Swal from 'sweetalert2';

interface Locations {
  results : {
    created: Date,
    dimension: string,
    id: number,
    name: string,
    residents: Array<string>,
    type: string,
    url: string
  }
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  constructor(private apiService: APIService,
              private sharedServices: SharedService,
              private searchBarService: SearchBarService) {
    this.searchBarService.showSearchBar.next(false);
              }

  result?: Object;

  ngOnInit(): void {
    this.apiService.getLocations()
    .subscribe(
      (res: Locations) => {
        this.result = res.results

      }
    )
  }

  getMultiplesIds(locations: Array<string>): void{
    let allLocations = this.sharedServices.getMultiplesIds(locations)
    this.getMultipleCharacters(allLocations);
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

  modalSwal(htmlContent: string): void{
    Swal.fire('List of characters for this episode', `<div><ol>${htmlContent}</ol></div>`)
  }

}
