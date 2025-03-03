import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { RickyMortyService } from '../../services/ricky-morty-service.service';
import { FormsModule } from '@angular/forms';
import { ElementsModule } from '../elements/elements.module';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ElementsModule
  ],
})
export class Tab2Page {
  personajes: any[] = [];
  url_next: string | null = '';
  loading: boolean = false;
  errorMessage: string | null = null;
  titulo1: string = '';
  subtitulo1: string = '';

  constructor(private bd: RickyMortyService) {}

  async ngOnInit() {
    await this.cargarPersonajes();
  }

  /** Carga la primera página de personajes */
  async cargarPersonajes() {
    this.loading = true;
    this.errorMessage = null;
    try {
      const resp: any = await firstValueFrom(this.bd.getPersonajes());
      this.personajes = resp.results;
      this.url_next = resp.info.next;
    } catch (error) {
      console.error('Error cargando personajes:', error);
      this.errorMessage = 'Error al cargar personajes.';
    } finally {
      this.loading = false;
    }
  }

  /** Carga más personajes cuando se hace scroll */
  async cargarPersonajesSiguientes() {
    if (!this.url_next) return;

    try {
      const resp: any = await firstValueFrom(this.bd.getPersonajes(this.url_next));
      this.personajes.push(...resp.results);
      this.url_next = resp.info.next;
    } catch (error) {
      console.error('Error cargando más personajes:', error);
    }
  }

  /** Maneja la actualización con "Pull to Refresh" */
  async refresh(event: any) {
    await this.cargarPersonajes();
    event.target.complete(); // Detiene la animación del refresher
  }

  /** Maneja el Infinite Scroll */
  async onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.url_next) {
      await this.cargarPersonajesSiguientes();
    }
    event.target.complete(); // Detiene la animación del Infinite Scroll
  }
}
