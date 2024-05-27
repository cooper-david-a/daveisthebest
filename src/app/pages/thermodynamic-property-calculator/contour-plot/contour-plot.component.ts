import { Component, OnInit, ViewChild, input } from '@angular/core';
import { TrustedHtmlPipe } from 'src/app/pipes/trusted-html.pipe';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';

@Component({
  selector: 'contour-plot',
  standalone: true,
  imports: [TrustedHtmlPipe],
  templateUrl: './contour-plot.component.html',
  styleUrl: './contour-plot.component.scss',
})
export class ContourPlotComponent implements OnInit {
  contourData = input.required<PlotData>();
  margin = input(30);
  width = input(200);
  height = input(200);

  chart!: string;

  ngOnInit(): void {
    const data = Array(this.width() * this.height())
      .fill(0)
      .map(
        (value, index) =>
          (index % this.width()) ** 2 + Math.floor(index / this.height()) ** 2
      );

    const xScale = d3.scaleLinear([0, 199], [0, this.width() - 1]);
    const yScale = d3.scaleLinear([0, 199], [0, this.height() - 1]);

    const svg = d3
      .create('svg')
      .attr('viewBox', [
        0,
        0,
        this.width() + 2 * this.margin(),
        this.height() + 2 * this.margin(),
      ])
      .style('display', 'block')
      .style('margin', 'auto');

    const thresholds = [1000, 5000, 10000, 20000, 40000];

    const contours = d3
      .contours()
      .size([this.width(), this.height()])
      .thresholds(thresholds);

    const color = d3.scaleSequentialLog(
      [Math.min(...thresholds), Math.max(...thresholds)],
      d3.interpolateMagma
    );

    const xAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
      g
        .call(d3.axisBottom(xScale))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick')
            .filter((d: any) => xScale.domain().includes(d))
            .remove()
        )
        .attr('font-size', '6');

    const yAxis = (g: d3.Selection<SVGGElement, undefined, null, undefined>) =>
      g
        .call(d3.axisLeft(yScale))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick')
            .filter((d: any) => yScale.domain().includes(d))
            .remove()
        )
        .attr('font-size', '6');

    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 0.2)
      .selectAll('path')
      .data(contours(data))
      .join('path')
      .attr('fill', 'none') //(d) => color(d.value))
      .attr('d', d3.geoPath())
      .style('stroke-dasharray', '5,5')
      .attr('transform', `translate(${this.margin()},${this.margin()})`);

    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(${this.margin()},${this.height()+this.margin()})`);

    svg
      .append('g')
      .call(yAxis)
      .attr('transform', `translate(${this.margin()},${this.margin()})`);

    svg
      .append('rect')
      .attr('width', this.width())
      .attr('height', this.height())
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '1')
      .attr('transform', `translate(${this.margin()},${this.margin()})`);

    this.chart = svg.node()?.outerHTML ?? '<p>Error</p>';
  }
}

export interface PlotData {
  x: number[];
  y: number[];
  z: number[];
}
