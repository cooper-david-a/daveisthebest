import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'trustedHtml',
  standalone: true,
})
export class TrustedHtmlPipe implements PipeTransform {
  private _sanitizer = inject(DomSanitizer);
  constructor() {}

  transform(v: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
