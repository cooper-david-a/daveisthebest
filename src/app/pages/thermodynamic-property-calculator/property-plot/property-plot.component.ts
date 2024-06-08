import { Component, OnInit, computed, input } from '@angular/core';
import { Contours } from 'd3';
import * as d3 from 'd3';

@Component({
  selector: 'property-plot',
  standalone: true,
  imports: [],
  templateUrl: './property-plot.component.html',
  styleUrl: './property-plot.component.scss',
})
export class PropertyPlotComponent implements OnInit {
  renderedPath = '';
  dummyData = {
    xVariable: 'P',
    yVariable: 'H',
    width: 0,
    height: 0,
    Q: { data: [[]], thresholds: [] },
    T: { data: [[]], thresholds: [] },
    P: { data: [[]], thresholds: [] },
    D: { data: [[]], thresholds: [] },
    U: { data: [[]], thresholds: [] },
    H: { data: [[]], thresholds: [] },
    S: { data: [[]], thresholds: [] },
  };

  data = input<PlotMetaData | null>(this.dummyData);

  width = computed(() => this.data()?.width ?? 0);
  height = computed(() => this.data()?.height ?? 0);
  viewBox = computed(() => `0,0,${this.width()},${this.height()}`);
  transform = computed(() => `scale(1,-1) translate(0,${-this.height()})`);

  fields = ['Q', 'T', 'P', 'D', 'U', 'H', 'S', 'V'];

  contours = computed(() => {
    let data = this.data() ?? this.dummyData;
    let generator!: Contours;
    let conts: { [field: string]: d3.ContourMultiPolygon[] } = {};

    for (let field of this.fields) {
      if (![data.xVariable, data.yVariable].includes(field)) {
        generator = d3.contours().size([this.width(), this.height()]);
        // .thresholds(data[key as keyof PlotData].thresholds);
        if (data[field as keyof PlotData]) {
          conts[field] = generator(data[field as keyof PlotData].data.flat());
        }
      }
    }
    return conts;
  });

  ngOnInit(): void {}

  generatePath(coordinates: number[][]) {
    if (coordinates) {
      const pathSerializer = d3.path();
      pathSerializer.moveTo(coordinates[0][0], coordinates[0][1]);
      for (let i = 1; i < coordinates.length; i++) {
        pathSerializer.lineTo(coordinates[i][0], coordinates[i][1]);
      }
      return pathSerializer.toString();
    }
    return '';
  }
}

export interface PlotMetaData extends PlotData {
  xVariable: string;
  yVariable: string;
  height: number;
  width: number;
}

export interface PlotData {
  Q: { data: number[][]; thresholds: number[] };
  T: { data: number[][]; thresholds: number[] };
  P: { data: number[][]; thresholds: number[] };
  D: { data: number[][]; thresholds: number[] };
  U: { data: number[][]; thresholds: number[] };
  H: { data: number[][]; thresholds: number[] };
  S: { data: number[][]; thresholds: number[] };
}
