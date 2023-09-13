import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AvaliacoesService } from '../avaliacoes.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab2Page {
  allWorkouts !: any;
  selectedDays: string[] = [];
  workouts: string[] = [];
  currentDate: string = ''; 
  showDatetime: boolean = false; 

  constructor(private api : AvaliacoesService, private storage: StorageService) {}

  async ngOnInit(): Promise<void> {
    await this.loadWorkouts();
    this.updateComponent()
  }


  async loadWorkouts(){
    this.selectedDays = []
    this.workouts = await new Promise((resolve) => {
      this.api.getWorkouts().subscribe(workouts=>{
        console.log({workouts})
        workouts.map((workout: any) => {
          this.selectedDays.push(workout.date)
        })
        resolve(this.selectedDays)
      })
    })

  }


  async ionViewDidEnter() {
    this.updateComponent()
    const keys = await this.storage.keys()
    keys.map(async (key) => {
      const data = await this.storage.get(key)
      console.log({data})
    })
    console.log({keys})
  }

  updateComponent() {
    this.selectedDays = this.workouts
  }

  onDaysChanged(event: any) {
    event.preventDefault()
    console.log("values:", event.detail.value)
    this.updateComponent()
  }

}
