import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../models/player';

@Component({
  selector: 'app-dialog-player-name',
  templateUrl: './dialog-player-name.component.html',
  styleUrls: ['./dialog-player-name.component.css'],
})
export class DialogPlayerNameComponent {
  @ViewChild('form', { static: false }) form: NgForm;

  constructor(public dialogRef: MatDialogRef<DialogPlayerNameComponent>, @Inject(MAT_DIALOG_DATA) public data: Player) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
