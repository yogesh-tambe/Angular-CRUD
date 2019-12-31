import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from './author.model';
 
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  //apiUrl = 'http://localhost:3000/authors.json';
  constructor(private _http: HttpClient) {
  }

  getAuthors() {
    return this._http.get<Author[]>('http://localhost:3000/authors.json');
  }
}
