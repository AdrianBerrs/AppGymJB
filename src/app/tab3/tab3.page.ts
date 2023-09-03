import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { AvaliacoesService} from '../avaliacoes.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,HttpClientModule,NgFor],
})
export class Tab3Page {
  constructor(private api : AvaliacoesService) { 
  }
  todasavaliacoes !: any;
  

  avaliacao = { idade: '', peso: '', altura: '', gordura: '', pesoGordura: '', massaMagra: '', pesoMassaMagra: '', massaMuscular: '', pesoMassaMuscular: '', agua: '', teorAgua: '', gorduraV: '', pesoOssos: '', metabolismo: '', proteina: '', obesidade: '', idadeCorpo: '', lbm: ''}
  carregaAvaliacao(){
    this.api.readData().subscribe(res=>{
      this.todasavaliacoes = res;
    })
  }
  ngOnInit(): void {
    this.carregaAvaliacao();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.carregaAvaliacao();
      event.target.complete();
    }, 2000);
  }
  deletaAvaliacao(id: any){
    this.api.deleteData(id).subscribe(res=>{
      this.carregaAvaliacao();  
    })
  }  
}
