import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopwatch',
})
export class StopwatchPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const tenths = Math.round(10 * seconds) % 10;
    seconds = Math.round(seconds % 60);

    return `${minutes}:` + ('0' + `${seconds}`).slice(-2) + `.${tenths}`;
  }
}
