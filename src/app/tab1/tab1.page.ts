import { Component } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './modal/tab1-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Exercise } from './types';

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
})

export class Tab1Page {
  sessions: { date: Date, name: string; expanded: boolean; exercises: Exercise[] }[] = [];
  

  constructor(private modalCtrl: ModalController, private storage: StorageService, private alertController: AlertController) {
    this.initStorage();
  }

  async ionViewDidEnter() {
    await this.loadSessionsFromStorage();
  }

  async initStorage() {
    // await this.storage.create();
    this.loadSessionsFromStorage();
  }

  async openSessionModal() {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const newSession = { date: new Date(), name: data.data.name, expanded: false, exercises: data.data.exercises };
        this.sessions.push(newSession);
        this.saveSessionToStorage(data.data.name, data.data.exercises);
      }

      console.log(this.sessions,"1")


      this.loadSessionsFromStorage();
    });

    console.log(this.sessions)
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
        date: new Date(),
        name: sessionName,
        expanded: false,
        exercises: data.exercises
      });
    }
  }

  async saveSessionToStorage(sessionName: string, exercises: Exercise[]) {
    const exerciseData = {

      exercises: exercises,
    };

    console.log({exerciseData, sessionName})

    await this.storage.set(sessionName, exerciseData);
  }

  expandSession(session: { expanded: boolean }) {
    session.expanded = !session.expanded;
  }

  markExerciseComplete(session: { exercises: Exercise[] }, exercise: Exercise) {
    exercise.checked = exercise.checked;   

    if (this.areAllExercisesCompleted(session)) {
        this.confirmSessionCompletion(session);
    }

    this.saveSessionsToStorage();
  }

  async editSession(session: { name: string; exercises: Exercise[] }) {
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

  async removeSession(session: { date: Date, name: string; expanded: boolean; exercises: Exercise[] }) {
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

  areAllExercisesCompleted(session: { exercises: { name: string; checked: boolean }[] }): boolean {
    return session.exercises.every(exercise => exercise.checked);
  }

  async confirmSessionCompletion(session: { exercises: { name: string; checked: boolean }[] }): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Deseja finalizar a sessão de treino?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            session.exercises.forEach(exercise => (exercise.checked = false));
            this.saveSessionsToStorage();
            this.loadSessionsFromStorage();

            //Pessoal da frequencia pode usar esse trecho do codigo pra chamar os metodos do calendario.
          },
        },
        {
          text: 'Não',
          handler: () => {
            if (session.exercises.length > 0) {
              const lastExercise = session.exercises[session.exercises.length - 1];
              lastExercise.checked = false;
              this.saveSessionsToStorage();
              this.loadSessionsFromStorage();
            }
          },
        },        
      ],
    });
    await alert.present();
  }
}