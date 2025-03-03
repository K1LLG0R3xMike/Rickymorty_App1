import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { URL_RM } from '../config/url.service';

@Injectable({
  providedIn: 'root',
})
export class RickyMortyService {
  constructor(private http: HttpClient) {}

  // Obtener todos los personajes
  getPersonajes(url: string = 'https://rickandmortyapi.com/api/character') {
    return this.http.get(url);
  }
  

  // Obtener todos los episodios
  getEpisodios(): Observable<EpisodeResponse> {
    const url = `${URL_RM}/episode`;
    return this.http.get<EpisodeResponse>(url).pipe(
      map((res: EpisodeResponse) => res)
    );
  }

  // Obtener los personajes de un episodio específico
  getPersonajesPorEpisodio(episodeId: number): Observable<Character[]> {
    const url = `${URL_RM}/episode/${episodeId}`;
    return this.http.get<Episode>(url).pipe(
      map((episode: Episode) => episode.characters), // Extraemos las URLs de personajes
      mergeMap((characterUrls: string[]) => {
        const requests = characterUrls.map(url => this.http.get<Character>(url));
        return forkJoin(requests); // Ejecuta todas las peticiones en paralelo
      })
    );
  }
  
}

// Interfaz para la respuesta completa de personajes
interface CharacterResponse {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
}

// Interfaz para un personaje individual
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  episode: string[]; // Lista de episodios en los que aparece
}

// Interfaz para la respuesta de episodios
interface EpisodeResponse {
  results: Episode[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
}

// Interfaz para un episodio individual
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // Lista de URLs de los personajes en el episodio
}
