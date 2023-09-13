import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
  ],
})
export class Splashpage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
