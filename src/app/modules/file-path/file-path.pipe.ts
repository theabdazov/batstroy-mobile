import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({
  name: 'filePath'
})
export class FilePathPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return null;
    }
    return `${environment.backendUrl}${value}`;
  }

}
