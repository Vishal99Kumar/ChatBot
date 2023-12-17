import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private sharedVariableSubject = new BehaviorSubject<any>(null);
  sharedVariable$ = this.sharedVariableSubject.asObservable();

  updateSharedVariable(newValue: any) {
    this.sharedVariableSubject.next(newValue);
  }
}
