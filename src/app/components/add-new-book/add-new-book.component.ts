import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book-model';
import { BookService, bookCategories, bookformats, bookLanguages } from '../../services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadImageService } from '../../services/upload-image.service';
import { HttpEventType } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook: Book;
  private bookAdded: boolean;
  categories = bookCategories;
  formats = bookformats;
  languages = bookLanguages;
  private fileToUpload;

  bookForm: FormGroup;

  constructor(private bookService: BookService,
              private uploadImageService: UploadImageService) { }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook = new Book();
    this.bookForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'category': new FormControl(this.categories[0].name),
      'author': new FormControl(null, [Validators.required]),
      'publisher': new FormControl(null, [Validators.required]),
      'publicationDate': new FormControl(null),
      'format': new FormControl(this.formats[0].name),
      'pages': new FormControl(null),
      'isbn': new FormControl(null, [Validators.required]),
      'originalPrice': new FormControl(null, [Validators.required]),
      'discountedPrice': new FormControl(null, [Validators.required]),
      'weight': new FormControl(null, [Validators.required]),
      'language': new FormControl(this.languages[0].name),
      'numbersInStock': new FormControl(null, [Validators.required]),
      'isActive': new FormControl(true),
      'description': new FormControl(null)
    });
  }

  onSaveBook() {
    this.convertToBookObj();
    this.bookService.saveBook(this.newBook)
        .subscribe(
          res => {
            this.bookAdded = true;
            console.log(res);

            let bookId = res.id;
            this.uploadImageService.onUpload(this.fileToUpload, bookId)
                .subscribe(
                  event => {
                    if(event.type === HttpEventType.UploadProgress) {
                      console.log('Upload in progress: ' + Math.round(event.loaded/event.total*100) + '%');
                    } else if(event.type === HttpEventType.Response) {
                      console.log(event);
                    }
                  },
                  err => console.log(err)
                );
          },
          err => {
            console.log(err);
          }
        );
  }

  convertToBookObj() {
    this.newBook.author = this.bookForm.get('author').value;
    this.newBook.category = this.bookForm.get('category').value;
    this.newBook.discountedPrice = this.bookForm.get('discountedPrice').value;
    this.newBook.description = this.bookForm.get('description').value;
    this.newBook.format = this.bookForm.get('format').value;
    this.newBook.isActive = this.bookForm.get('isActive').value;
    this.newBook.isbn = this.bookForm.get('isbn').value;
    this.newBook.language = this.bookForm.get('language').value;
    this.newBook.numbersInStock = this.bookForm.get('numbersInStock').value;
    this.newBook.originalPrice = this.bookForm.get('originalPrice').value;
    this.newBook.pages = this.bookForm.get('pages').value;
    this.newBook.publicationDate = this.bookForm.get('publicationDate').value;
    this.newBook.publisher = this.bookForm.get('publisher').value;
    this.newBook.title = this.bookForm.get('title').value;
    this.newBook.weight = this.bookForm.get('weight').value;
  }

  fileChangeEvent(event) {
    console.log(event);
    this.fileToUpload = event.target.files[0];
  }

}
