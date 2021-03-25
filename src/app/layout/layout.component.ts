import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'at-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public accountName: string;

  constructor(
    private layout: LayoutService
  ) {
    this.accountName = '';
  }

  ngOnInit() {
    this.layout.accountName.subscribe(
      account => {
        if (account)
          this.accountName = account
      }
    );
  }
}
