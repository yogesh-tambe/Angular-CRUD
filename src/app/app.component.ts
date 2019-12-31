import { Component, OnInit } from '@angular/core';
import { AuthorsService } from './authors.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Author } from './author.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthorsService]
})
export class AppComponent implements OnInit {
  authors$: Author[];
  p: Number = 1;
  count: Number = 10;
  constructor(private authorsService: AuthorsService) { }

  ngOnInit() {
    return this.authorsService.getAuthors()
    .subscribe(author => this.authors$ = author);
  }
}
