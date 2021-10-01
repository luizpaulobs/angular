import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModal } from './modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  dataConfig: IModal = {text: undefined, title: undefined, confirmar: 'Confirmar', cancelar: 'Cancelar'};

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModal 
    
  ) { }

  ngOnInit(): void {
    this.dataConfig = {...this.dataConfig, ...this.data}
  }

}
