import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.page.html',
  styleUrls: ['./session-modal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
})
export class SessionModalPage {
  sessionName: string = '';
  exercises: { name: string }[] = [];
  newExerciseName: string = '';

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addExercise() {
    if (this.newExerciseName.trim() !== '') {
      this.exercises.push({ name: this.newExerciseName });
      this.newExerciseName = '';
    }
  }

  addSession() {
    this.modalCtrl.dismiss({ name: this.sessionName, exercises: this.exercises });
  }
}