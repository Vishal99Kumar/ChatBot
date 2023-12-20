import { Component } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  Display: Boolean = true;
  constructor(
    private dialog: MatDialog,
    private dataService: DataShareService
  ) {}
  openDialog() {
    this.dataService.updatecloseHeader(true);
    const dialogRef = this.dialog.open(LoginComponent, {
      // height: '400px',
      width: '400px',
      position: { bottom: '10px' },
      panelClass: ["popupClass", 'animate__animated','animate__slideInUp'],
      backdropClass: "internalBlurClass",
      autoFocus: true,
      maxWidth: "30vw",
      minWidth: "30vw",
      disableClose: true
    });
  }

  CloseChatDialog() {
    this.dataService.updatecloseHeader(false);
    //console.log('close');
    this.dataService.updateInternalVariable("nothing");
    this.dataService.updateSharedVariable(this.Display);
  }
}
