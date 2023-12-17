import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-bot';
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true,
        dialogConfig.autoFocus = true,
        dialogConfig.backdropClass = "blurClass",
        dialogConfig.panelClass = "popupClass",
        dialogConfig.maxWidth = "35vw",

        this.dialog.open(PopupComponent, dialogConfig);
  }
}
