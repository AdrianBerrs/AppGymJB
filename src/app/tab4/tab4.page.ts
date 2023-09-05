import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AvaliacoesService} from '../avaliacoes.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,FormsModule,HttpClientModule],
})

export class Tab4Page {
  avaliacao = 
  { 
    data: '', 
    idade: '', 
    peso: '', 
    altura: '', 
    gordura: '', 
    pesoGordura: '', 
    massaMagra: '', 
    pesoMassaMagra: '', 
    massaMuscular: '', 
    pesoMassaMuscular: '', 
    agua: '', 
    teorAgua: '', 
    gorduraV: '', 
    pesoOssos: '', 
    metabolismo: '', 
    proteina: '', 
    obesidade: '', 
    idadeCorpo: '', 
    lbm: '' 
  }
  
  constructor(private api : AvaliacoesService) {}

  criaAvaliacao(){
    console.log("idade: "+this.avaliacao.idade)
    this.api.createData(this.avaliacao)
  } 
}
