import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'at-http-404',
  templateUrl: './http-404.component.html',
  styleUrls: ['./http-404.component.scss']
})
export class Http404Component implements OnInit {

  constructor(
    private title: Title,
    private sessions: SessionService,
  ) {

  }

  ngOnInit(): void {
    this.sessions.accountNameAsync().subscribe(
      accountName => {
        if (accountName)
          this.title.setTitle(`${accountName} - Login`);
        else
          this.title.setTitle(`Não encontrado`);
      }
    );
  }
}
