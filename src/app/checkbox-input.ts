import {AfterViewInit, Directive, inject, OnInit} from '@angular/core';
import {AbstractControlDirective, FormControlName, NgControl} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Observable, ReplaySubject} from 'rxjs';

@Directive({
  standalone: true,
  selector: '[matCheckboxInput]',
  providers: [
    {provide: MatFormFieldControl, useExisting: CheckboxInputDirective}
  ],
})
export class CheckboxInputDirective implements MatFormFieldControl<any>, OnInit, AfterViewInit {
  value: any;
  stateChanges$$ = new ReplaySubject<void>(1);
  stateChanges: Observable<void> = this.stateChanges$$.asObservable();
  id: string = '';
  placeholder: string = '';
  ngControl: NgControl | AbstractControlDirective | null = null;
  focused: boolean = false;
  empty: boolean = false;
  shouldLabelFloat: boolean = false;
  required: boolean = false;
  disabled: boolean = false;
  errorState: boolean = false;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  host = inject(MatCheckbox, {host: true});
  formControl = inject(FormControlName, {host: true});

  ngOnInit() {
    this.formControl.statusChanges?.subscribe(() => {
      this.updateErrorState();
    });
  }

  private updateErrorState() {

    this.errorState = !this.formControl.valid;
    this.stateChanges$$.next();
  }

  ngAfterViewInit() {
    this.host._inputElement.nativeElement.addEventListener('focus', () => {
      this.focused = true;
      this.stateChanges$$.next();
    });
    this.host._inputElement.nativeElement.addEventListener('blur', () => {
      this.focused = false;
      this.stateChanges$$.next();
      this.updateErrorState();
    });

  }

  setDescribedByIds(ids: string[]): void {
  }

  onContainerClick(event: MouseEvent): void {
    this.host.focus();
    this.focused = true;
    this.stateChanges$$.next();
  }
}
