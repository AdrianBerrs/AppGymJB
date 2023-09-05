import { Component, NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './modal/session-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
})

export class Tab1Page {
  sessions: { name: string; completed: boolean; exercises: { name: string }[] }[] = [];

  constructor(private modalCtrl: ModalController) {}

  async openSessionModal() {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.sessions.push({ name: data.data.name, completed: false, exercises: data.data.exercises });
      }
    });

    return await modal.present();
  }

  markSessionComplete(session: { name: string; completed: boolean }) {
    session.completed = !session.completed;
  }
}