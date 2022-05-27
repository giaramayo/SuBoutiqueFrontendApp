import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberpipe'
})
export class NumberPipe implements PipeTransform {

  transform( num: number ): string {
    return num.toString().replace(/./g, ',');
  }

}
