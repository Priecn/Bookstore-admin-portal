import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class UploadImageService {
    constructor(private http: HttpClient) { }

    onUpload(file: File, bookId: number) {
        const fd = new FormData();
        fd.append('image', file, file.name);

        let url = 'http://localhost:8080/book/image/upload';
        return this.http.post(url, fd, {
            reportProgress: true,
            observe: 'events',
            params: new HttpParams().set('bookId', bookId+'')
        });
    }
}