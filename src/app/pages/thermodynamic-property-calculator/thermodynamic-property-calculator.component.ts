import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import {
  Component,
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
import {MatAutocompleteModule} from '@angular/material/autocomplete'

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
  ],
})
export class ThermodynamicPropertyCalculatorComponent implements OnInit {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  renderer = inject(Renderer2);
  dom = inject(DOCUMENT);
  plotType = 'PH';

  constructor() {}

  ngOnInit() {
    if (this.isBrowser) {
      let coolpropScript = this.renderer.createElement('script');
      coolpropScript.src = 'assets/scripts/coolprop/coolprop.js';
      coolpropScript.async = true;
      coolpropScript.defer = true;
      coolpropScript.type = 'text/javascript';
      this.renderer.appendChild(this.dom.head, coolpropScript);
    }
  }

  stateForm = new FormGroup({
    fluid: new FormControl('Water', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    states: new FormArray<FormGroup<StateFormGroup>>([this.stateFactory()]),
  });

  addState() {
    this.stateForm.controls.states.push(this.stateFactory());
  }

  stateFactory() {
    return new FormGroup<StateFormGroup>({
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
    if (this.stateForm.controls.states.length > 1) {
      this.stateForm.controls.states.removeAt(index);
      console.log('index= ', index, 'states= ', this.stateForm.value);
    }
  }

  propertyPlot() {}
}

interface StateFormGroup {
  prop1: FormGroup<FluidPropertyFormGroup>;
  prop2: FormGroup<FluidPropertyFormGroup>;
}

interface FluidPropertyFormGroup {
  property: FormControl<string>;
  value: FormControl<number>;
  units: FormControl<string>;
}
