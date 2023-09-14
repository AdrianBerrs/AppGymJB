import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StorageService } from '../storage.service';
import { Session } from '../tab1/types';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab2Page {
  selectedDays: string[] = [];
  sessions: Session[] = [];

  constructor(private storage: StorageService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadWorkouts();
  }

  async ionViewDidEnter() {
    await this.loadWorkouts();
  }

  async loadWorkouts(){
    this.sessions = await this.storage.getAllSessionByUser();
    
    this.selectedDays = this.sessions
      .map((session: Session): string => this.formatDateToISO(session?.date) ?? '')
      .filter((date) => !!date)

    console.log(this.selectedDays)
  }

  formatDateToISO(date: Date): string {
    return date.toISOString()
  }
}
