import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Exercise, Session } from '../types';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-tab1-modal',
  templateUrl: './tab1-modal.page.html',
  styleUrls: ['./tab1-modal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  providers: [StorageService]
})

export class SessionModalPage {
  session: Session
  exercises: Exercise[] = [];
  newExerciseName: string = '';
  isNewExerciseNameEmpty: boolean = true;
  isModalEmpty: boolean = true;

  constructor(private modalCtrl: ModalController, private storage: StorageService) {
    this.session = {
      date: new Date(),
      exercises: [],
      expanded: false,
      name: '',
      _id: ''
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  toggleAddIcon() {
    if (this.newExerciseName.trim() === '' || this.session.name.trim() === '') {
      this.isNewExerciseNameEmpty = true;
    } else {
      this.isNewExerciseNameEmpty = false;
    }
  }

  addExercise() {
    if (this.newExerciseName.trim() !== '') {
      this.exercises.push({ name: this.newExerciseName, checked: false });
      this.newExerciseName = '';
      this.isModalEmpty = false;
    }
  }

  async removeExercise(index: number, exerciseId?: string) {
    if (index >= 0 && index < this.exercises.length) {
      this.exercises.splice(index, 1);
    }

    if (this.exercises.length === 0) {
      this.isModalEmpty = true;
    }
    else {
      this.isModalEmpty = false;
    }

    await this.storage.removeExercise(this.session._id ?? '', exerciseId ?? '')
  }

  checkModalEmpty() {
    this.isModalEmpty = this.session.name.trim() === '' && this.exercises.length === 0;
  }

  async saveSession() {
    if (!this.session._id) {
      const sessionCreated = await this.storage.creaseSession({exercises: this.exercises, date: new Date(), expanded: false, name: this.session.name})
      console.log("session created:",{sessionCreated})
    } else {
      const sessionUpdated = await this.storage.updateSession(this.session)
      console.log("session updated:", {sessionUpdated} )
    }

    this.closeModal();
  }
}