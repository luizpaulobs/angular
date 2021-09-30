import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-removermodal',
  templateUrl: './removermodal.component.html',
  styleUrls: ['./removermodal.component.scss']
})
export class RemovermodalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RemovermodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string}
  ) { }

  ngOnInit(): void {
  
  }

}
