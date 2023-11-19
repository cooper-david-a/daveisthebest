import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince',
})
export class TimeSincePipe implements PipeTransform {
  transform(value: string): string {
    let deltaT = Date.now() - new Date(value).getTime();
    return this.humanReadableDuration(deltaT);
  }

  humanReadableDuration(deltaT:number) {
    let minutes = Math.floor(deltaT / 1000 / 60);
    if (minutes <= 2) return 'just now';
    let hours = Math.floor(minutes / 60);
    if (hours <= 1) return `${minutes} minutes ago`;
    let days = Math.floor(hours / 24);
    if (days <= 1) return `${hours} hours ago`;
    let weeks = Math.floor(days / 7);
    if (weeks <= 1) return `${days} days ago`;
    let months = Math.floor(days / 30);
    if (months <= 1) return `${weeks} weeks ago`;
    let years = Math.floor(days / 365);
    if (years <= 1) return `${months} months ago`;
    return `${years} years ago`;
  }

}
