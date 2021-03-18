import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) {

  }

  private openTop(message: string, actionText: string = 'x', duration: number = 2000, action?: () => void): void {
    var config: MatSnackBarConfig = {
      duration: duration,
      verticalPosition: 'top'
    };
    this.snackBar.open(message, actionText, config);
  }

  private openBottom(message: string, actionText: string = 'x', duration: number = 2000, action?: () => void): void {
    var config: MatSnackBarConfig = {
      duration: duration,
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, actionText, config);
  }
}
