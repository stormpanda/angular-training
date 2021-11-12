import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  add(message: string) {
    this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
  }

  clear() {
    this.messagesSubject.next([]);
  }
}
