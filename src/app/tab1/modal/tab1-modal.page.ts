import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
  providers: [Storage]
})

export class SessionModalPage {
  sessionName: string = '';
  exercises: { name: string, checked: boolean }[] = [];
  newExerciseName: string = '';
  isNewExerciseNameEmpty: boolean = true;
  isModalEmpty: boolean = true;

  constructor(private modalCtrl: ModalController, private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  toggleAddIcon() {
    if (this.newExerciseName.trim() === '' || this.sessionName.trim() === '') {
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

  removeExercise(index: number) {
    if (index >= 0 && index < this.exercises.length) {
      this.exercises.splice(index, 1);
    }

    if (this.exercises.length === 0) {
      this.isModalEmpty = true;
    }
    else {
      this.isModalEmpty = false;
    }
  }

  checkModalEmpty() {
    this.isModalEmpty = this.sessionName.trim() === '' && this.exercises.length === 0;
  }

  saveSession() {
    if (this.sessionName.trim() !== '' && this.exercises.length > 0) {
      this.storage.set("session" + this.sessionName, { exercises: this.exercises });
    }
    
    this.closeModal();
  }
}