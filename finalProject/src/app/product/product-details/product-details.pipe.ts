import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDetail'
})
export class ProductDetailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return `
      <img src="${value.picture.large}">
    `;
  }

}
