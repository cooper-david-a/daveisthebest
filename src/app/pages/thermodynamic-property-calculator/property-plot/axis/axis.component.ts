import { Component, computed, input } from '@angular/core';
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
  strokeWidth = input<number>(0.1);
  min = input.required<number>();
  max = input.required<number>();
  spacing = input<'linear' | 'log'>('linear');
  scale = computed(() => {
    console.log(
      d3.scaleLinear([0, this.axisLength()], [this.min(), this.max()])
    );
    if (this.spacing() === 'log') {
      return d3.scaleLog([0, this.axisLength()], [this.min(), this.max()]);
    }
    return d3.scaleLinear([0, this.axisLength()], [this.min(), this.max()]);
  });
}
