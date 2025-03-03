import { Component, Input, OnInit } from '@angular/core';
import { RickyMortyService } from '../../../services/ricky-morty-service.service';

@Component({
  selector: 'app-episodio-list',
  templateUrl: './episodio-list.component.html',
  styleUrls: ['./episodio-list.component.scss'],
  standalone: false
})
export class EpisodioListComponent implements OnInit {
  @Input() titulo!: string; // 🔹 Agregado @Input()
  @Input() subtitulo!: string; // 🔹 Agregado @Input()

  episodios: any[] = [];

  constructor(private rickAndMortyService: RickyMortyService) {}

  ngOnInit() {
    console.log('Título recibido:', this.titulo);
    console.log('Subtítulo recibido:', this.subtitulo);

    this.rickAndMortyService.getEpisodios().subscribe((data: any) => {
      this.episodios = data.results;
    });
  }
}
