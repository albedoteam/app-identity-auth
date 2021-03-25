import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'at-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private title: Title,
    private sessions: SessionService,
  ) {

  }

  ngOnInit(): void {
    this.sessions.accountNameAsync().subscribe(
      accountName => {
        if (accountName)
          this.title.setTitle(`${accountName} - Esqueceu sua senha?`);
      }
    );
  }
}
