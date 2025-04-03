import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'virgule'
})
export class VirgulePipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(2);
  }

}
