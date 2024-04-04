import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stopwatch',
    standalone: true,
})
export class StopwatchPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const tenths = Math.floor(10 * seconds) % 10;
    seconds = Math.floor(seconds % 60);

    return `${minutes}:` + ('0' + `${seconds}`).slice(-2) + `.${tenths}`;
  }
}
