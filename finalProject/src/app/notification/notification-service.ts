import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    @Output() send: EventEmitter<object> = new EventEmitter();

    sendMessage(message, type) {
        this.send.emit({ 'message': message, 'type': type });
    }

}