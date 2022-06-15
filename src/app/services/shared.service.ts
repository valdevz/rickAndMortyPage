import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getMultiplesIds(characters: Array<string>){
    let allCharacters: Array<number> = [];
    for (let i = 0; i < characters.length; i++) {
      let splitedString = characters[i].split('/');
      let characterId = splitedString[splitedString.length - 1]
      allCharacters.push(Number(characterId))
    }
    return allCharacters.join()
  }

  findWord(data: Object, filter: string, avoidData: Array<string>): Array<any>{
    let arr: Array<any> = Object.values(data)
    let result: Array<any> = [];
    for (let i = 0; i < arr.length; i++) {
      for(let j = 0; j < avoidData.length; j++){delete arr[i][`${avoidData[j]}`];}
        const elString: string = JSON.stringify(arr[i]).toLowerCase();
        let element: string = elString.replace(/"|{|}/g,'');
      if(element.includes(filter.toLowerCase())){
        result.push(arr[i])
      }
    }
    return result; 
  }

}