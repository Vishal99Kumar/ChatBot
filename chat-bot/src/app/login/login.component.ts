import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public dialog: MatDialogRef<LoginComponent>) {}

  close(){
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInUp")
      document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutDown");
      setTimeout(()=>{this.dialog.close();}, 1000);
  }
}
