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
    const dialogRef = this.dialog.open(LoginComponent, {
      // height: '400px',
      width: '400px',
      position: { bottom: '10px' },
    });
  }
  CloseChatDialog() {
    //console.log('close');
    this.dataService.updateSharedVariable(this.Display);
  }
}
