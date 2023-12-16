import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface messageBody {
  id: number;
  text: string;
  origin: string;
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;
  message: string = '';
  messages: messageBody[] = [];
  responseOnServer: string = '';
  display: boolean = true;
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>){}

  dialogeClose(): void {
    this.dialogRef.close();
  }

  sendMessage() {

    if (this.message && this.message.trim() !== '') {
    this.messages.push({
      id: this.messages.length + 1,
      text: this.message,
      origin: 'me',
    });
    this.scrollToBottom();
    this.display = false;
    //this.dataService.setOption('Display', this.display);
    // this.msg.postData({ message: this.message }).subscribe((response) => {
    //   console.log('Response from backend:', response.answer.content);
    //   this.responseOnServer = response.answer.content;
    //   this.messages.push({
    //     id: this.messages.length + 1,
    //     text: this.responseOnServer,
    //     origin: 'Server',
    //   });
    //   this.scrollToBottom();
    // });
    this.message = '';
  }
}
scrollToBottom(): void {
  try {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  } catch (err) {
    console.error(err);
  }
}
}
