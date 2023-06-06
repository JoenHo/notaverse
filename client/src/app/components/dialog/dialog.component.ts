import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { config } from 'src/app/config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  note: any;
  elements: any;
  userId: any;
  img_url_base: string = config.ASSETS_URL;

  /** Constructor */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private dialog: MatDialog,
    private noteService: NoteService
  ) {}

  /** OnInit hook */
  ngOnInit() {
    this.note = { ...this.data.noteData };
    this.elements = this.data.elements;
    this.userId = this.data.userId;
    if (this.data.type === 'create'){
      this.note = {'img_url' : this.elements[0]?.img_url}
    }
  }

  onSubmit() {
    let refreshRequired = false;
    if (this.data.noteData===null){
      // Create Note
      this.createNote().subscribe(() => {
        refreshRequired = true;
        this.dialogRef.close(refreshRequired);
      });
    }else{
      // Update Note
      if (this.isNoteModified()) {
        this.updateNote().subscribe(() => {
          refreshRequired = true;
          this.dialogRef.close(refreshRequired);
        });
      } else {
        this.dialogRef.close(refreshRequired);
      }
    }
  }

  showConfirmationDialog(): void {
    // Show the confirmation dialog for deletion
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete?' }
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result===true) {
        // delete
        this.noteService.deleteNoteById(this.note.noteId).subscribe((res: any) => {
          if(res) {
            console.log('Note deleted successfully:', res);
          }
          let refreshRequired = true;
          this.dialogRef.close(refreshRequired);
        })
      }
    });
  }

  updateNote() {
    const title = this.note.title || ' ';
    const content = this.note.content || ' ';
    // Send an HTTP request to update the note using the updated values
    return this.noteService.updateNote(this.note.noteId, title, this.note.img_url, content);
  }

  createNote() {
    const title = this.note.title || ' ';
    const content = this.note.content || ' ';
    // Send an HTTP request to create the note
    return this.noteService.createNote(this.userId, title, this.note.img_url, content);
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
