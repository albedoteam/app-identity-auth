import { Component, OnInit } from '@angular/core';
import { CallbackService } from './callback.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private callbacks: CallbackService
  ) {
  }

  ngOnInit() {
    this.callbacks.validateRedirection();
  }
}
