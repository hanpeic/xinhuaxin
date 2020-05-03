import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SubmitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
  }
  close(confirm): void {
    this.dialogRef.close(confirm);
  }
}
