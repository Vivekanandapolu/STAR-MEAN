import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, count: any): any {
    console.log(value.length);
    if (value && value.length > count) {
      return value.substring(0, count) + '...'
    }
    else {
      return value
    }
  }

}

@NgModule({
  declarations: [TrimPipe],
  exports: [TrimPipe]
})

export class TrimPipeModule { }