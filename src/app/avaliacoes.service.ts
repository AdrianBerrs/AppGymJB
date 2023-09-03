import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {


  url = 'http://localhost:3000/';
  
  

  constructor(private http: HttpClient) { 
  }

  createData(data : any){    
    this.http.post<any>("http://localhost:3000/posts",data).subscribe(res => { console.log(res);});
    return 1;        
  }
  readData(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }  
  deleteData(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  
}
