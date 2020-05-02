import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                message: string;
              }) { }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
}
