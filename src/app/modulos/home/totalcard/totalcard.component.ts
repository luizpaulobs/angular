import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-totalcard',
  templateUrl: './totalcard.component.html',
  styleUrls: ['./totalcard.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalcardComponent implements OnInit {

  @Input() total: number = 0;
  @Input() texto: string;
  @Input() icone: string; 
  @Input() cor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
