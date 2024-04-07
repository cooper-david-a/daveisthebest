import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss'],
    standalone: true,
    imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
],
})
export class CommentFormComponent {
  @Input() parentCommentId!: number;
  @Input() closable = false;
  @Output() close = new EventEmitter();

  handleCloseForm() {
    this.close.emit();
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }
}
