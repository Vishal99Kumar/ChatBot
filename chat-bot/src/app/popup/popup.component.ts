import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataShareService } from '../data-share.service';
import { MessageServiceService } from '../message-service.service';
import { DatePipe } from '@angular/common';

interface messageBody {
  id: number;
  text: string;
  origin: string;
  timestamp: string;
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
  display: boolean;
  typingGif: boolean = false;
  isInnerTileShown:boolean = false;
  isReadOnly:boolean = false;
  timeStamp:any;
  constructor(private datePipe: DatePipe,
    private msg: MessageServiceService,
    private dialogRef: MatDialogRef<PopupComponent>,
    private dataService: DataShareService){
      this.dataService.sharedVariable$.subscribe((value) => {
        
          this.display = value;
          this.messages = [];
        
        //console.log(this.display,"popup");
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
    this.timeStamp = this.datePipe.transform(new Date(), 'shortTime');
    this.isReadOnly = true;
    //this.dataService.updateInternalVariable("nothing");
    this.typingGif = true;
    if (this.message && this.message.trim() !== '') {
    this.messages.push({
      id: this.messages.length + 1,
      text: this.message,
      origin: 'me',
      timestamp: this.timeStamp,
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
        timestamp: this.timeStamp,
      });
      this.scrollToBottom();
      this.typingGif = false;
      this.isReadOnly = false;
    });
    this.message = '';
  }
}
scrollToBottom(): void {
  try {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight + "px";
  } catch (err) {
    //console.error(err);
  }
}
}
