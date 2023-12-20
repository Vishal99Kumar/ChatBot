import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataShareService } from '../data-share.service';
import { MessageServiceService } from '../message-service.service';

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
export class PopupComponent implements OnInit {
  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;
  message: string = '';
  messages: messageBody[] = [];
  responseOnServer: string = '';
  display: boolean = true;
  typingGif: boolean = false;
  isInnerTileShown:boolean = false;
  constructor(
    private msg: MessageServiceService,
    private dialogRef: MatDialogRef<PopupComponent>,
    private dataService: DataShareService){
      this.dataService.sharedVariable$.subscribe((value) => {
        if (value) {
          this.display = value;
          this.messages = [];
        }
        //console.log(this.display);
      });
    }
  ngOnInit(): void {
    this.dataService.internalTile.subscribe((res) => {
      this.isInnerTileShown = (res == "nothing")? false : true;
    })
  }

  dialogeClose(): void {
    this.dataService.updatecloseHeader(false);
    this.dataService.updateInternalVariable("nothing");
    this.dialogRef.close();
  }

  sendMessage() {
    this.dataService.updateInternalVariable("nothing");
    this.typingGif = true;
    if (this.message && this.message.trim() !== '') {
    this.messages.push({
      id: this.messages.length + 1,
      text: this.message,
      origin: 'me',
    });
    this.scrollToBottom();
    this.display = false;
    //this.dataService.setOption('Display', this.display);
    this.msg.postData({ message: this.message }).subscribe((response) => {
      console.log('Response from backend:', response.answer.content);
      this.responseOnServer = response.answer.content;
      this.responseOnServer = (this.responseOnServer == undefined || this.responseOnServer == null)? "Sorry, I didn't understand." : this.responseOnServer;
      this.messages.push({
        id: this.messages.length + 1,
        text: this.responseOnServer,
        origin: 'Server',
      });
      this.scrollToBottom();
      this.typingGif = false;
    });
    this.message = '';
  }
}
scrollToBottom(): void {
  try {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight + "px";
  } catch (err) {
    console.error(err);
  }
}
}
