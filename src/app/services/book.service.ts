import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book-model';
import { Observable } from 'rxjs';

class Category {
  constructor(public name: string, public value: string){ };
}

class OptionItem {
  constructor(public name: string, public value: string){ };
}

export const bookCategories = [
  new Category("Management", "Management"),
  new Category("Fiction", "Fiction"),
  new Category("Engineering", "Engineering"),
  new Category("Programming", "Programming"),
  new Category("Arts & Literature", "Arts & Literature")
];

export const bookformats = [
  new OptionItem("Paperback", "Paperback"),
  new OptionItem("Hard Cover", "Hard Cover")
];

export const bookLanguages = [
  new OptionItem("English", "English"),
  new OptionItem("Hindi", "Hindi"),
  new OptionItem("Sanskrit", "Sanskrit")
];

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  saveBook(book: Book): Observable<Book> {
    let url = "http://localhost:8080/book/add";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post<Book>(url, JSON.stringify(book), {headers: headers});
  }
}
