import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';

import { config } from 'src/app/config';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  note: any;
  elements: any;
  img_url_base: string = config.ASSETS_URL;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.note = {
      title: '',
      img_url: '', // Provide a default value for img_url
      content: '',
    };
    this.elements = this.data.elements;
  }

  onSubmit() {
    this.isLoading = true; // Set isLoading to true to indicate that a request is being made
    this.noteService
      .createNote(this.note.title, this.note.img_url, this.note.content)
      .pipe(
        finalize(() => {
          // Set isLoading to false when the request is completed (regardless of success or error)
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('Note created successfully:', res);
          this.dialogRef.close(true); // Close the dialog and pass true as the result
        },
        error: (error: any) => {
          console.error('Failed to create note:', error);
        },
      });
  }
}
