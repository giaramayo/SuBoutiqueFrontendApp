import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( name: string ): string {
    return `assets/${ name }.jpg`;
  }

}
