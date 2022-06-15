import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getId'
})
export class GetIdPipe implements PipeTransform {

  transform(url: String): String {
    let arrSplited =  url.split('/')
    let id = arrSplited[arrSplited.length -1]
    return id;
  }

}
