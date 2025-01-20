import { Component } from '@angular/core';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent {
  sections = [
    {
      title: 'About us',
      links: [
        { name: 'Business idea', url: '' },
        { name: 'Markets and expansion', url: '' },
        { name: 'Our values', url: '' },
        { name: 'Inclusion and diversity', url: '' },
        { name: 'History', url: '' },
        { name: 'Contact and services', url: '' },
        { name: 'Raise a concern', url: '' }
      ]
    },
    {
      title: 'Sustainability',
      links: [
        { name: 'Sustainability reporting', url: '' },
        { name: 'How we report', url: '' },
        { name: 'Materiality', url: '' },
        { name: 'Vision and strategy', url: '' },
        { name: 'Goals and ambition', url: '' },
        { name: 'Transparency', url: '' },
        { name: 'Green investment', url: '' }
      ]
    },
    {
      title: 'Investors',
      links: [
        { name: 'Annual and Sustainability Report 2023', url: '' },
        { name: 'Financial calendar', url: '' },
        { name: 'Reports and presentations', url: '' },
        { name: 'Total shareholder return', url: '' },
        { name: 'Share price', url: '' },
        { name: 'Shareholders', url: '' },
        { name: 'Dividend', url: '' }
      ]
    },
    {
      title: 'Brands',
      links: [
        { name: 'Brand 1', url: '' },
        { name: 'Brand 2', url: '' },
        { name: 'Brand 3', url: '' },
        { name: 'Brand 4', url: '' },
      ]
    }
  ];
}
