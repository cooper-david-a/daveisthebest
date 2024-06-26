import {
  isPlatformBrowser,
  DOCUMENT,
  DecimalPipe,
  AsyncPipe,
} from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {
  PlotMetaData,
  PropertyPlotComponent,
} from './property-plot/property-plot.component';
import { HttpClient } from '@angular/common/http';
import { Subscription, map, take } from 'rxjs';

declare const Module: {
  PropsSI: (
    property: string,
    input1: string,
    value1: number,
    input2: string,
    value2: number,
    fluid: string
  ) => number;
};

@Component({
  selector: 'thermodynamic-property-calculator',
  templateUrl: './thermodynamic-property-calculator.component.html',
  styleUrls: ['./thermodynamic-property-calculator.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTabsModule,
    DecimalPipe,
    AsyncPipe,
    PropertyPlotComponent,
  ],
})
export class ThermodynamicPropertyCalculatorComponent implements OnInit {
  dom = inject(DOCUMENT);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  renderer = inject(Renderer2);
  http = inject(HttpClient);
  states: State[] = [];
  TSData!: PlotMetaData;
  PHData!: PlotMetaData;
  phDataSubscription!:Subscription;
  tsDataSubscription!:Subscription;

  get moduleIsLoaded() {
    if (Module == undefined) {
      return false;
    }
    return !!Module.PropsSI;
  }

  ready = false;

  constructor() {}

  ngOnInit() {
    this.phDataSubscription = this.getPlotData('PH_Water').subscribe((data) => {this.PHData = data});
    this.tsDataSubscription = this.getPlotData('TS_Water').subscribe((data) => {this.TSData = data});

    if (this.isBrowser) {
      let coolpropScript = this.renderer.createElement('script');
      coolpropScript.src = 'assets/scripts/coolprop/coolprop.js';
      coolpropScript.async = true;
      coolpropScript.defer = true;
      coolpropScript.type = 'text/javascript';
      this.renderer.appendChild(this.dom.head, coolpropScript);
      coolpropScript.onload = () => {
        if (this.moduleIsLoaded) {
          this.calculate(this.stateForm.controls.statesFormArray.at(0), 0);
          this.ready = true;
        } else {
          setTimeout(coolpropScript.onload, 200);
        }
      };
    }
  }

  stateForm = new FormGroup({
    fluid: new FormControl('Water', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    statesFormArray: new FormArray<FormGroup<StateFormGroup>>([
      this.stateFormFactory(),
    ]),
  });

  addState() {
    let newStateForm = this.stateFormFactory();
    this.calculate(
      newStateForm,
      this.stateForm.controls.statesFormArray.length
    );
    this.stateForm.controls.statesFormArray.push(newStateForm);
  }

  stateFormFactory() {
    return new FormGroup<StateFormGroup>({
      label: new FormControl('', { nonNullable: true }),
      prop1: new FormGroup<FluidPropertyFormGroup>({
        property: new FormControl('P', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        value: new FormControl(101, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        units: new FormControl('kPa', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      prop2: new FormGroup<FluidPropertyFormGroup>({
        property: new FormControl<string>('Q', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        value: new FormControl<number>(0, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        units: new FormControl<string>('-', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
    });
  }

  deleteState(index: number) {
    if (this.stateForm.controls.statesFormArray.length > 1) {
      this.stateForm.controls.statesFormArray.removeAt(index);
    }
  }

  calculate(stateFormGroup: FormGroup<StateFormGroup>, index: number) {
    const fluid = this.stateForm.value.fluid ?? 'Water';
    const prop1 = <FluidProperty>stateFormGroup.getRawValue().prop1;
    const prop2 = <FluidProperty>stateFormGroup.getRawValue().prop2;
    prop1.value =
      prop1.units && prop1.value
        ? this.convertToSI(prop1.units, prop1.value)
        : 0;
    prop2.value =
      prop2.units && prop2.value
        ? this.convertToSI(prop2.units, prop2.value)
        : 0;

    let state = {
      Q: Module.PropsSI(
        'Q',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      T: Module.PropsSI(
        'T',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      P: Module.PropsSI(
        'P',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      D: Module.PropsSI(
        'D',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      U: Module.PropsSI(
        'U',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      H: Module.PropsSI(
        'H',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
      S: Module.PropsSI(
        'S',
        prop1.property,
        prop1.value,
        prop2.property,
        prop2.value,
        fluid
      ),
    };
    this.states[index] = state;
  }

  calculateAll() {
    this.stateForm.controls.statesFormArray.controls.forEach(
      (stateFormGroup, index) => this.calculate(stateFormGroup, index)
    );
  }

  units: Units = {
    Q: ['-', '%'],
    T: ['K', '°C'],
    P: ['Pa', 'kPa'],
    D: ['kg/m^3'],
    U: ['kJ/kg', 'J/kg'],
    H: ['kJ/kg', 'J/kg'],
    S: ['kJ/(kg*K)', 'J/(kg*K)'],
  };

  getPropertyUnits(formGroup: FormGroup<FluidPropertyFormGroup>) {
    let validUnits =
      this.units[formGroup.controls.property.value as keyof Units];
    return validUnits;
  }

  onPropertyChange(formGroup: FormGroup<FluidPropertyFormGroup>) {
    let validUnits =
      this.units[formGroup.controls.property.value as keyof Units];
    formGroup.controls.units.setValue(validUnits[0]);
  }

  convertToSI(fromUnits: string, value: number) {
    switch (fromUnits) {
      case '-':
        return value;
      case '%':
        return value / 100;
      case 'K':
        return value;
      case '°C':
        return value + 273.15;
      case 'Pa':
        return value;
      case 'kPa':
        return value * 1000;
      case 'MPa':
        return value * 1e6;
      case 'kg/m^3':
        return value;
      case 'J/kg':
        return value;
      case 'kJ/kg':
        return value * 1000;
      case 'J/(kg*K)':
        return value;
      case 'kJ/(kg*K)':
        return value * 1000;
      default:
        return NaN;
    }
  }

  convertFromSI(toUnits: string, value: number) {
    switch (toUnits) {
      case '-':
        return value;
      case '%':
        return value * 100;
      case 'K':
        return value;
      case '°C':
        return value - 273.15;
      case 'Pa':
        return value;
      case 'kPa':
        return value / 1000;
      case 'MPa':
        return value / 1e6;
      case 'kg/m^3':
        return value;
      case 'J/kg':
        return value;
      case 'kJ/kg':
        return value / 1000;
      case 'J/(kg*K)':
        return value;
      case 'kJ/(kg*K)':
        return value / 1000;
      default:
        return NaN;
    }
  }

  getPlotData(type: string) {
    const baseUrl = '/assets/data/';
    return this.http.get<PlotMetaData>(`${baseUrl}${type}.json`).pipe(take(1));
  }
}

interface StateFormGroup {
  label: FormControl<string>;
  prop1: FormGroup<FluidPropertyFormGroup>;
  prop2: FormGroup<FluidPropertyFormGroup>;
}

interface State {
  Q: number;
  T: number;
  P: number;
  D: number;
  U: number;
  H: number;
  S: number;
}
interface FluidPropertyFormGroup {
  property: FormControl<string>;
  value: FormControl<number>;
  units: FormControl<string>;
}

interface FluidProperty {
  property: string;
  value: number;
  units: string;
}

interface Units {
  Q: ['-', '%'];
  T: ['K', '°C'];
  P: ['Pa', 'kPa'];
  D: ['kg/m^3'];
  U: ['kJ/kg', 'J/kg'];
  H: ['kJ/kg', 'J/kg'];
  S: ['kJ/(kg*K)', 'J/(kg*K)'];
}
