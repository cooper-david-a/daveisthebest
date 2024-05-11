import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'password-reset-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './password-reset-dialog.component.html',
  styleUrl: './password-reset-dialog.component.scss',
})
export class PasswordResetDialogComponent {
  dialogRef: MatDialogRef<PasswordResetDialogComponent> = inject(MatDialogRef);
  email = new FormControl<string>('', {
    validators: [Validators.email, Validators.required],
    nonNullable: true,
  });


}
