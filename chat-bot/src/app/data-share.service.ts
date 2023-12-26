import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private sharedVariableSubject = new BehaviorSubject<any>(true);
  sharedVariable$ = this.sharedVariableSubject.asObservable();

  updateSharedVariable(newValue: any) {
        this.sharedVariableSubject.next(newValue);
  }

  private showInternalTile = new BehaviorSubject<any>("nothing");
  internalTile = this.showInternalTile.asObservable();

  updateInternalVariable(newValue: string) {
    this.showInternalTile.next(newValue);
  }

  private closeHeader = new BehaviorSubject<any>(false);
  closeHeaderPage = this.closeHeader.asObservable();

  updatecloseHeader(newValue: boolean) {
    this.closeHeader.next(newValue);
  }

}
