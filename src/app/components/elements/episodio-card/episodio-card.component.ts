import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodio-card',
  templateUrl: './episodio-card.component.html',
  styleUrls: ['./episodio-card.component.scss'],
  standalone: false
})
export class EpisodioCardComponent  implements OnInit {
  @Input() episodio: any;

  constructor() { }

  ngOnInit() {}

}
