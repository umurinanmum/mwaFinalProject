import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    @Output() send: EventEmitter<object> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() deleteResult: EventEmitter<any> = new EventEmitter();
    @Output() loginEvent : EventEmitter<any> = new  EventEmitter();

    sendMessage(message, type) {
        this.send.emit({ 'message': message, 'type': type });
    }

    deleteConfirmation() {
        this.delete.emit();
    }

    deleteResultBack(confirmed : boolean){
        this.deleteResult.emit(confirmed);
    }

    sendLogin(dummy){
        console.log('sending login event');
        this.loginEvent.emit(dummy);
    }

}