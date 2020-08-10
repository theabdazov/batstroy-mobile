import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  validValue() {
    if (!this.value) {
      this.value = 0;
    }
  }

  increment() {
    this.validValue();
    this.value += 1;
    this.valueChange.emit(this.value);
  }

  decrement() {
    this.validValue();
    if (this.value >= 2) {
      this.value -= 1;
      this.valueChange.emit(this.value);
    }
  }

  onChanged() {
    if (!this.value || this.value < 1) {
      this.value = 1;
    }
    this.valueChange.emit(this.value);
  }
}
