import { AfterViewChecked, Component, computed, input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: '[axis]',
  standalone: true,
  imports: [],
  templateUrl: './axis.component.html',
  styleUrl: './axis.component.scss',
})
export class AxisComponent {
  axisLength = input.required<number>();
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  strokeWidth = input<number>(2);
  min = input.required<number>();
  max = input.required<number>();
  spacing = input<'linear' | 'log'>('linear');
  insideTickLength = input(5);
  outsideTickLength = input(5);
  fontSize = input(15);
  scale = computed(() => {
    if (this.spacing() === 'log') {
      return d3
        .scaleLog([this.min(), this.max()], [0, this.axisLength()])
        .nice();
    }
    return d3
      .scaleLinear([this.min(), this.max()], [0, this.axisLength()])
      .nice();
  });

  positionText(tickValue: number) {
    let reflect = this.orientation() != 'horizontal';
    return `translate(${this.scale()(tickValue)}, ${
      this.outsideTickLength() + 20
    }) ${reflect?'rotate(90) scale(-1,1)':''}`;
  }
}
