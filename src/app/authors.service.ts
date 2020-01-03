import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from './author.model';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  url = 'http://localhost:3000/authors';
  constructor(private _http: HttpClient) {
  }

  getAuthors() {
    return this._http.get<Author[]>(this.url);
  }

  getAllAuthors(): Observable<Author[]>{
    return this._http.get<Author[]>(this.url);
  }

  getAuthorById(authorId: string): Observable<Author>{
    return this._http.get<Author>(this.url+"/"+authorId );
  }

  createAuthor(author: Author): Observable<Author>{
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    let options = {
      headers:httpHeaders
    };
    return this._http.post<Author>(this.url, author, options);
  }

  updateAuthor(author: Author): Observable<number>{
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    let options = {
      headers:httpHeaders
    };
    return this._http.put<number>(this.url+"/"+author.id, author, options);
  }

  deleteAuthorById(authorId: string): Observable<number>{
    let httpHeaders = new HttpHeaders().
    set('Content-Type', 'application/json');

    return this._http.delete<number>(this.url+"/"+authorId);
  }
}
