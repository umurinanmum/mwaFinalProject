import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MwaHttpServiceService {

  private baseUrl: string = "http://localhost:3000/api/";

  constructor(private client: HttpClient) { }

  get(path: string) {
    return this.client.get(this.baseUrl + path);
  };

  post(path: string, body: string) {
    return this.client.post(this.baseUrl + path, body);
  }

  put(path: string, body: string) {
    return this.client.put(this.baseUrl + path, body);
  }

  delete(path: string) {
    return this.client.delete(path);
  }

}
