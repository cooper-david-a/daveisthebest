import { Component, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'toggle-expansion-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './toggle-expansion-button.component.html',
  styleUrl: './toggle-expansion-button.component.scss',
})
export class ToggleExpansionButtonComponent {
  open = model(false);
  color = input()
}
