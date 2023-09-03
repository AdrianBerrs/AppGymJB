import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AvaliacoesService} from '../avaliacoes.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';





@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,FormsModule,HttpClientModule],
})

export class Tab4Page {
  avaliacao = { data: '',idade: '', peso: '', altura: '', gordura: '', pesoGordura: '', massaMagra: '', pesoMassaMagra: '', massaMuscular: '', pesoMassaMuscular: '', agua: '', teorAgua: '', gorduraV: '', pesoOssos: '', metabolismo: '', proteina: '', obesidade: '', idadeCorpo: '', lbm: ''}
  
  constructor(private api : AvaliacoesService) { 
  }

  criaAvaliacao(){
    console.log("idade: "+this.avaliacao.idade)
    this.api.createData(this.avaliacao)
  }

  
}
