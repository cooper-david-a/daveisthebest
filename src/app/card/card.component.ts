import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() imageURL!:string;
    @Input() title!:string;
    @Input() text!:string;
}
