import { KeyValuePipe, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  computed,
  input,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Contours } from 'd3';
import * as d3 from 'd3';
import { AxisComponent } from './axis/axis.component';

@Component({
  selector: 'property-plot',
  standalone: true,
  imports: [
    MatCheckboxModule,
    KeyValuePipe,
    FormsModule,
    AxisComponent,
    NgStyle,
  ],
  templateUrl: './property-plot.component.html',
  styleUrl: './property-plot.component.scss',
})
export class PropertyPlotComponent implements OnInit {
  plotElement = viewChild<ElementRef<SVGElement>>('plot');
  dummyData = {
    xVariable: 'P',
    yVariable: 'H',
    nx: 0,
    ny: 0,
    Q: { data: [[]], thresholds: [] },
    T: { data: [[]], thresholds: [] },
    P: { data: [[]], thresholds: [] },
    D: { data: [[]], thresholds: [] },
    U: { data: [[]], thresholds: [] },
    H: { data: [[]], thresholds: [] },
    S: { data: [[]], thresholds: [] },
  };
  data = input<PlotMetaData | null>(this.dummyData);
  marginTop = input<number>(30);
  marginRight = input<number>(30);
  marginBottom = input<number>(70);
  marginLeft = input<number>(70);

  contourViewBox = computed(
    () => `0,0,${this.data()?.nx},${this.data()?.ny}`
  );
  contourTransform = computed(
    () => `scale(1,-1) translate(0,${-(this.data()?.ny ?? 0)})`
  );
  contourWidth = computed(()=>{
    let plotElementWidth = this.plotElement()?.nativeElement.clientWidth ?? 0;
    return plotElementWidth - this.marginLeft() - this.marginRight();
  })
  contourHeight = computed(()=>{
    let plotElementHeight = this.plotElement()?.nativeElement.clientHeight ?? 0;
    return plotElementHeight - this.marginTop() - this.marginBottom();
  })

  xDomain = computed(() => {
    let xVariable = this.data()?.xVariable ?? 'H';
    let data = this.data() ?? this.dummyData;
    return [
      Math.min(...data[xVariable as keyof PlotData].data.flat()),
      Math.max(...data[xVariable as keyof PlotData].data.flat()),
    ];
  });
  xAxisTransform = computed(() => {
    let plotHeight = this.plotElement()?.nativeElement.clientHeight ?? 0;
    return `translate(${this.marginLeft()},${
      plotHeight - this.marginBottom()
    })`;
  });

  yDomain = computed(() => {
    let yVariable = this.data()?.yVariable ?? 'P';
    let data = this.data() ?? this.dummyData;
    return [
      Math.min(...data[yVariable as keyof PlotData].data.flat()),
      Math.max(...data[yVariable as keyof PlotData].data.flat()),
    ];
  });
  yAxisTransform = computed(() => {
    let plotHeight = this.plotElement()?.nativeElement.clientHeight ?? 0;
    return `translate(${this.marginLeft()},${plotHeight - this.marginBottom()}) rotate(-90) scale(1,-1)`;
  });

  fields = {
    Q: { visible: true },
    T: { visible: false },
    P: { visible: false },
    D: { visible: false },
    U: { visible: false },
    H: { visible: false },
    S: { visible: false },
  };

  contours = computed(() => {
    let data = this.data() ?? this.dummyData;
    let generator!: Contours;
    let conts: { [field: string]: d3.ContourMultiPolygon[] } = {};

    for (let field of Object.keys(this.fields)) {
      if (![data.xVariable, data.yVariable].includes(field)) {
        generator = d3
          .contours()
          .size([this.data()?.nx ?? 0, this.data()?.ny ?? 0]);

        if (data[field as keyof PlotData].thresholds.length > 0) {
          generator.thresholds(data[field as keyof PlotData].thresholds);
        }

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

  toggleVisibility(field: string) {
    this.fields[field as keyof typeof this.fields].visible =
      !this.fields[field as keyof typeof this.fields].visible;
  }
}

export interface PlotMetaData extends PlotData {
  xVariable: string;
  yVariable: string;
  ny: number;
  nx: number;
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
