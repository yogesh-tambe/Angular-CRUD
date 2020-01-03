import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthorsService } from '../authors.service';
import { Observable } from 'rxjs';
import { Author } from '../author.model';

@Component({
  selector: 'app-ng-edit',
  templateUrl: './ng-edit.component.html',
  styleUrls: ['./ng-edit.component.css']
})
export class NgEditComponent implements OnInit {

  @Input() name: string;
  authorForm: any;
  allAuthors:Observable<Author[]>;
  dataSaved = false;
  authorIdToUpdate = null;
  message = null;

  constructor(private formBuilder: FormBuilder, private authorsService: AuthorsService) { }

  // name = 'Angular';
  enableEdit = false;
  enableEditIndex = null;
  p: Number = 1;
  count: Number = 10;

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    this.authorsService.getAuthorById(i).subscribe(author => {
    this.message = null;
    this.dataSaved = false;
    this.authorIdToUpdate = author.id;
    this.authorForm.controls['first_name'].setValue(author.first_name);
    this.authorForm.controls['last_name'].setValue(author.last_name);
    this.authorForm.controls['date_of_birth'].setValue(author.date_of_birth);
    })
    console.log(i, e);
  }

  cancel() {
    console.log('cancel');
    this.enableEditIndex = null;
  }

  saveSegment() {
    this.enableEditIndex = null;
  }

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

  createAuthor(author: Author) {
    if(this.authorIdToUpdate == null)
    {
      this.authorsService.createAuthor(author).subscribe(
        () => {
          this.dataSaved = true;
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
          this.loadAllAuthors();
          this.authorIdToUpdate = null;
          this.authorForm.reset();
        });
    }
  }

  onFormSubmit() {
    this.dataSaved = false;
    let author = this.authorForm.value;
    this.createAuthor(author);
    this.authorForm.reset();
    this.enableEditIndex = null;
  }

  deleteAuthor(authorId: string) {
    this.authorsService.deleteAuthorById(authorId).
    subscribe(() => {
      this.loadAllAuthors();
      this.authorIdToUpdate = null;
      // this.authorForm.reset();
    }) 
  }

}
