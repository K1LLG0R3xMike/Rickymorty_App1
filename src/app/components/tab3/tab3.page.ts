import { Component, OnInit } from '@angular/core';
import { RickyMortyService } from '../../services/ricky-morty-service.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  episodios: any[] = [];  // Almacenará los episodios
  personajes: any[] = []; // Almacenará los personajes del episodio seleccionado
  episodioSeleccionado: any = null; // Guardará el episodio seleccionado
  // Dentro de Tab2Page
  titulo1: string = 'Personajes';
  subtitulo1: string = 'Rick and Morty';


  constructor(private rickyMortyService: RickyMortyService) {}

  ngOnInit() {
    this.rickyMortyService.getEpisodios().pipe(
      map(response => response.results), // Extraemos los episodios de la respuesta
      catchError((error) => {
        console.error('Error al obtener los episodios:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe(episodios => this.episodios = episodios);
  }

  cargarPersonajes(episodeId: number) {
    this.episodioSeleccionado = this.episodios.find(ep => ep.id === episodeId);
    this.personajes = []; // Limpiar la lista antes de cargar nuevos personajes

    this.rickyMortyService.getPersonajesPorEpisodio(episodeId).pipe(
      catchError((error) => {
        console.error('Error al obtener los personajes:', error);
        return of([]); // Retorna un array vacío si hay error
      })
    ).subscribe((personajes: any[]) => this.personajes = personajes);

  }
}
