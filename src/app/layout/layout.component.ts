import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'at-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public clientName: string;

  constructor(
    private layout: LayoutService
  ) {
    this.clientName = '';
  }

  ngOnInit() {
    this.layout.AccountAsync().subscribe(
      account => {
        if (account)
          this.clientName = account?.displayName
      }
    );
  }
}
