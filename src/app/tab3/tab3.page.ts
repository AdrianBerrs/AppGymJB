import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    ExploreContainerComponent,
    HttpClientModule,
    NgFor
  ],
})

export class Tab3Page {
  todasavaliacoes: any = [];

  constructor(private storage: StorageService, private toastController: ToastController) {
    this.loadAvaliacoesFromStorage()
  }

  async loadAvaliacoesFromStorage() {
    this.todasavaliacoes = [];
    const keys = await this.storage.keys();

    for (const key of keys) {
      if (key.includes("avaliacao")) {
        await this.loadAvaliacaoFromStorage(key);
      }
    }
  }

  ionViewDidEnter() {
    this.loadAvaliacoesFromStorage();
  }

  async loadAvaliacaoFromStorage(key: string) {
    const session = await this.storage.get(key);
    this.todasavaliacoes.push(session);
  }

  async deletaAvaliacao(key: string) {
    await this.storage.remove("avaliacao" + key);
    this.loadAvaliacoesFromStorage();

    const toast = await this.toastController.create({
      message: 'Avaliação excluída com sucesso!',
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }
}