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
  }

  async ionViewDidEnter() {
    await this.loadSessionsFromStorage();
  }

  async openSessionModal() {
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
    });

    modal.onDidDismiss().then((data) => {
      console.log({data})
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
    this.sessions = await this.storage.getAllSessionByUser()
    console.log({sessions: this.sessions})
  }

  async saveSessionToStorage(session: Session) {
    await this.storage.updateSession(session);
  }

  expandSession(session: { expanded: boolean }) {
    if (!session) {
      return
    }
    session.expanded = !session.expanded;
  }

  async markExerciseComplete(session: Session, exercise: Exercise) {
    if (!this.areAllExercisesCompleted(session)) {
      return
    }
    
    this.confirmSessionCompletion(session, exercise);

    this.saveSessionsToStorage();
  }

  async editSession(session: Session) {
    const sessionToUpdate = await this.storage.getSessionById(session._id ?? '')
    if (!sessionToUpdate) {
      return alert("Sessão de treino não existe!")
    }
    const modal = await this.modalCtrl.create({
      component: SessionModalPage,
      componentProps: {
        session: sessionToUpdate,
        sessionName: sessionToUpdate.name,
        exercises: sessionToUpdate.exercises,
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

    await this.storage.removeSession(session._id)
  }

  async saveSessionsToStorage() {
    for (const session of this.sessions) {
      await this.saveSessionToStorage(session);
    }
  }

  doneSession(session: Session): boolean {
    return this.areAllExercisesCompleted(session)
  }

  areAllExercisesCompleted(session: Session): boolean {
    if (!session?.exercises) {
      return false
    }
    return session.exercises.every(exercise => exercise.checked);
  }

  async confirmSessionCompletion(session: Session, exercise: Exercise): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Deseja finalizar a sessão de treino?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            exercise.checked = true;   
            await this.storage.updateExercise(session._id ?? '', exercise)
            this.saveSessionsToStorage();
            this.loadSessionsFromStorage();
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