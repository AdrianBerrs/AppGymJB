import { Component, Injectable } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './modal/tab1-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  providers: [Storage]
})

export class Tab1Page {
  sessions: { name: string; completed: boolean; exercises: { name: string }[] }[] = [];

  constructor(private modalCtrl: ModalController, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.loadSessionsFromStorage();
  }

  async openSessionModal() {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.sessions.push({ name: data.data.name, completed: false, exercises: data.data.exercises });
        this.saveSessionToStorage(data.data.name, data.data.exercises);
      }
    });

    return await modal.present();
  }

  loadSessionsFromStorage() {
    this.sessions = [];
    this.storage.keys().then(keys => {
      keys.forEach(key => {
        this.loadSessionFromStorage(key);
      });
    });
  }

  loadSessionFromStorage(sessionName: string) {
    this.storage.get(sessionName).then((data) => {
      if (data) {
        this.sessions.push({
          name: sessionName,
          completed: false,
          exercises: data.exercises
        });
      }
    });
  }

  saveSessionToStorage(sessionName: string, exercises: { name: string }[]) {
    const exerciseData = {
      exercises: exercises
    };
    this.storage.set(sessionName, exerciseData);
  }

  markSessionComplete(session: { name: string; completed: boolean }) {
    session.completed = !session.completed;
  }
}