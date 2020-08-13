import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePathPipe } from './file-path.pipe';



@NgModule({
  declarations: [FilePathPipe],
  imports: [
    CommonModule
  ],
  exports: [FilePathPipe]
})
export class FilePathModule { }
