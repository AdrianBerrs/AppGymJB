import { Component } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './modal/tab1-modal.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Exercise, Session } from './types';

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
  sessions: Session[] = [];

  constructor(private modalCtrl: ModalController, private storage: StorageService, private alertController: AlertController) {
    this.loadSessionsFromStorage();
  }

  async ionViewDidEnter() {
    await this.loadSessionsFromStorage();
  }

  async openSessionModal() {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const newSession: Session = { date: new Date(), name: data.data.name, expanded: false, exercises: data.data.exercises };
        this.sessions.push(newSession);
        this.saveSessionToStorage(newSession);
      }

      this.loadSessionsFromStorage();
    });

    console.log(this.sessions)
    return await modal.present();
  }

  async loadSessionsFromStorage() {
    this.sessions = [];
    const keys = await this.storage.keys();

    for (const key of keys) {
      if (key.includes("session")) {
        await this.loadSessionFromStorage(key);
      }   
    }
  }

  async loadSessionFromStorage(sessionName: string) {
    const data = await this.storage.get(sessionName);

    if (data) {
      this.sessions.push({
        date: new Date(),
        name: sessionName.replace("session", ""),
        expanded: false,
        exercises: data.exercises
      });
    }
  }

  async saveSessionToStorage(session: Session) {

    console.log({session})

    await this.storage.set("session" + session.name, session);
  }

  expandSession(session: { expanded: boolean }) {
    session.expanded = !session.expanded;
  }

  markExerciseComplete(session: Session, exercise: Exercise) {
    exercise.checked = exercise.checked;   

    if (this.areAllExercisesCompleted(session)) {
        this.confirmSessionCompletion(session);
    }

    this.saveSessionsToStorage();
  }

  async editSession(session: Session) {
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
        this.saveSessionToStorage(session);
      }
    });

    return await modal.present();
  }

  async removeSession(session: Session) {
    const index = this.sessions.indexOf(session);
    if (index !== -1) {
      this.sessions.splice(index, 1);
      await this.storage.remove("session" + session.name);
    }
  }

  async saveSessionsToStorage() {
    for (const session of this.sessions) {
      await this.saveSessionToStorage(session);
    }
  }

  areAllExercisesCompleted(session: Session): boolean {
    return session.exercises.every(exercise => exercise.checked);
  }

  async confirmSessionCompletion(session: Session): Promise<void> {
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