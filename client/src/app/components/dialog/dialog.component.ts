import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';

import { config } from 'src/app/config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  note: any;
  elements: any;
  img_url_base: string = config.ASSETS_URL;

  /** Constructor */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private noteService: NoteService
  ) {}

  /** OnInit hook */
  ngOnInit() {
    this.note = { ...this.data.noteData };
    this.elements = this.data.elements;
  }

  onSubmit() {
    if (this.isNoteModified()) {
      // Send the updated note to the backend for update
      this.updateNote();
    }
    this.dialogRef.close();
  }

  showConfirmationDialog(): void {
    // Show the confirmation dialog for deletion
  }

  updateNote() {
    // Send an HTTP request to update the note using the updated values
    this.noteService.updateNote(this.note.noteId, this.note.title, this.note.img_url, this.note.content).subscribe(
      (res: any) => {
        console.log('Note updated successfully:', res);
      },
      (error: any) => {
        console.error('Failed to update note:', error);
      }
    );
  }
  
  isNoteModified(): boolean {
    // Compare the current note values with the original values
    return (
      this.note.title !== this.data.noteData.title ||
      this.note.content !== this.data.noteData.content ||
      this.note.img_url !== this.data.noteData.img_url
    );
  }
}
