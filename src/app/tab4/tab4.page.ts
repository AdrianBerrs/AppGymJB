import { Component, Injectable } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    FormsModule,
  ]
})

export class Tab4Page {
  avaliacao = {
    data: '',
    nome: '',
    idade: '',
    peso: '',
    altura: '',
    gordura: '',
    pesoGordura: '',
    massaMagra: '',
    pesoMassaMagra: '',
    massaMuscular: '',
    pesoMassaMuscular: '',
    agua: '',
    teorAgua: '',
    gorduraV: '',
    pesoOssos: '',
    metabolismo: '',
    proteina: '',
    obesidade: '',
    idadeCorpo: '',
    lbm: '',
  };

  constructor(private storage: StorageService, private toastController: ToastController) {}

  async criaAvaliacao() {
    await this.storage.set("avaliacao" + this.avaliacao.nome, this.avaliacao);

    this.avaliacao = {
      data: '',
      nome: '',
      idade: '',
      peso: '',
      altura: '',
      gordura: '',
      pesoGordura: '',
      massaMagra: '',
      pesoMassaMagra: '',
      massaMuscular: '',
      pesoMassaMuscular: '',
      agua: '',
      teorAgua: '',
      gorduraV: '',
      pesoOssos: '',
      metabolismo: '',
      proteina: '',
      obesidade: '',
      idadeCorpo: '',
      lbm: '',
    };

    const toast = await this.toastController.create({
      message: 'Avaliação cadastrada com sucesso!',
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }
}
