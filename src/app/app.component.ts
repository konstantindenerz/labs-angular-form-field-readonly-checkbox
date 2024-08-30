import {JsonPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RouterOutlet} from '@angular/router';
import {CheckboxInputDirective} from './checkbox-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormField, MatLabel, MatInput, ReactiveFormsModule, JsonPipe, MatCheckbox, MatSuffix, MatError, MatHint, MatPrefix, CheckboxInputDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  formGroup = inject(FormBuilder).group({
    foo: ['foo'],
    test: ['42'],
    bar: [true, Validators.requiredTrue],
    bar2: [false, Validators.requiredTrue]
  });
}
