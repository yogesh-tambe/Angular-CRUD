import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Author } from '../author.model';
import { AuthorsService } from '../authors.service';



@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  dataSaved = false;
  authorForm:any;
  allAuthors:Observable<Author[]>;
  authorIdToUpdate = null;
  message = null;
  p: Number = 1;
  count: Number = 10;
  constructor(private formBuilder: FormBuilder, private authorsService: AuthorsService) { } 

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      date_of_birth: ['']
    });
    this.loadAllAuthors();
  }

  loadAllAuthors() {
    this.allAuthors = this.authorsService.getAllAuthors();
  }

  onFormSubmit() {
    this.dataSaved = false;
    let author = this.authorForm.value;
    this.createAuthor(author);
    this.authorForm.reset();
  }

  createAuthor(author: Author) {
    if(this.authorIdToUpdate == null)
    {
      this.authorsService.createAuthor(author).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved successfully';
          this.loadAllAuthors();
          this.authorIdToUpdate = null;
          this.authorForm.reset();
        }
      );
    } 
    else{
        author.id = this.authorIdToUpdate;
        this.authorsService.updateAuthor(author).
        subscribe(() => {
          this.dataSaved = true;
          this.message = 'Record saved successfully';
          this.loadAllAuthors();
          this.authorIdToUpdate = null;
          this.authorForm.reset();
        });
    }
  }

  loadAuthorToEdit(authorId: string) {
      this.authorsService.getAuthorById(authorId).subscribe(author => {
      this.message = null;
      this.dataSaved = false;
      this.authorIdToUpdate = author.id;
      this.authorForm.controls['first_name'].setValue(author.first_name);
      this.authorForm.controls['last_name'].setValue(author.last_name);
      this.authorForm.controls['date_of_birth'].setValue(author.date_of_birth);
    })
  }

  deleteAuthor(authorId: string) {
    this.authorsService.deleteAuthorById(authorId).
    subscribe(() => {
      this.message = 'Record deleted successfully';
      this.loadAllAuthors();
      this.authorIdToUpdate = null;
      this.authorForm.reset();
    }) 
  }

  resetForm() {
    this.authorForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
