import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 2,
    });

    const formattedValue = formatter.format(value) + ' €';
    return formattedValue;
  }

}
