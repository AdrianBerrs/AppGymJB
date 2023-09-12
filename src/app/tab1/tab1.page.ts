import { Component, Injectable } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './modal/tab1-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

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
  sessions: { name: string; expanded: boolean; exercises: { name: string; checked: boolean }[] }[] = [];

  constructor(private modalCtrl: ModalController, private storage: Storage) {
    this.initStorage();
  }

  async ionViewDidEnter() {
    await this.loadSessionsFromStorage();
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
        const newSession = { name: data.data.name, expanded: false, exercises: data.data.exercises };
        this.sessions.push(newSession);
        this.saveSessionToStorage(data.data.name, data.data.exercises);
      }

      this.loadSessionsFromStorage();
    });

    return await modal.present();
  }

  async loadSessionsFromStorage() {
    this.sessions = [];
    const keys = await this.storage.keys();

    for (const key of keys) {
      await this.loadSessionFromStorage(key);
    }
  }

  async loadSessionFromStorage(sessionName: string) {
    const data = await this.storage.get(sessionName);

    if (data) {
      this.sessions.push({
        name: sessionName,
        expanded: false,
        exercises: data.exercises
      });
    }
  }

  async saveSessionToStorage(sessionName: string, exercises: { name: string; checked: boolean }[]) {
    const exerciseData = {
      exercises: exercises,
    };

    await this.storage.set(sessionName, exerciseData);
  }

  expandSession(session: { expanded: boolean }) {
    session.expanded = !session.expanded;
  }

  markExerciseComplete(exercise: { name: string, checked: boolean }) {
    exercise.checked = exercise.checked;
    exercise.name = exercise.name;
    this.saveSessionsToStorage();
  }

  async editSession(session: { name: string; exercises: { name: string; checked: boolean }[] }) {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
      componentProps: {
        sessionName: session.name,
        exercises: session.exercises,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        session.name = data.data.name;
        session.exercises = data.data.exercises;
        this.saveSessionToStorage(data.data.name, data.data.exercises);
      }
    });

    return await modal.present();
  }

  async removeSession(session: { name: string; expanded: boolean; exercises: { name: string; checked: boolean; }[] }) {
    const index = this.sessions.indexOf(session);
    if (index !== -1) {
      this.sessions.splice(index, 1);
      await this.storage.remove(session.name);
    }
  }

  async saveSessionsToStorage() {
    for (const session of this.sessions) {
      await this.saveSessionToStorage(session.name, session.exercises);
    }
  }
}