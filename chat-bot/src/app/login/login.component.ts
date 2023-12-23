import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private dataService: DataShareService,
    public dialog: MatDialogRef<LoginComponent>) {}

  ngOnInit(): void {
    this.dataService.updatecloseHeader(true);
  }

  close(){
    this.dataService.updatecloseHeader(false);
    document.getElementsByClassName("animate__animated")[0].classList.remove("animate__slideInUp")
      document.getElementsByClassName("animate__animated")[0].classList.add("animate__slideOutDown");
      setTimeout(()=>{this.dialog.close();}, 1000);
  }
}
