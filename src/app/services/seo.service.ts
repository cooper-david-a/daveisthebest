import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  meta = inject(Meta);
  dom = inject(DOCUMENT);

  canonicalOrigin = 'https://daveisthebest.com';

  commonTags: MetaDefinition[] = [
    {
      name: 'description',
      content:
        'Dave is The Best is a collection of apps that I developed and have found useful.',
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:image',
      content: 'https://daveisthebest.com/assets/DaveIsTheBest.jpg',
    },
    {
      property: 'og:description',
      content:
        'Dave is The Best is a collection of apps that I developed and have found useful.',
    },
    { property: 'og:site_name', content: 'Dave Is The Best!?' },
    {
      property: 'og:title',
      content: 'Dave Is The Best!?',
    },
    { property: 'og:url', content: 'https://daveisthebest.com' },
    { property: 'twitter:card', content: 'summary' },
    {
      property: 'twitter:image',
      content: 'https://daveisthebest.com/assets/DaveIsTheBest.jpg',
    },
    {
      property: 'twitter:description',
      content:
        'Dave is The Best is a collection of apps that I developed and have found useful.',
    },
    {
      property: 'twitter:title',
      content: 'Dave Is The Best!?',
    },
  ];

  constructor() {
    let canonicalLink: HTMLLinkElement = this.dom.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(canonicalLink);
    canonicalLink.setAttribute(
      'href',
      this.canonicalOrigin + this.dom.location.pathname
    );
  }

  addCommonTags() {
    this.meta.addTags(this.commonTags);
  }

  addSpecificTags(tags: MetaDefinition[]) {
    this.meta.addTags(tags);
  }
}
