import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage : Storage
  constructor() {
    this.storage = new Storage()
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }
  
  async get(key: string): Promise<any> {
    return this.storage.get(key)
  }
  
  set(key: string, value: any): Promise<any> {
    return this.storage.set(key,value)
  } 
 
  remove(key: string): Promise<any> {
    return this.storage.remove(key)
  }
  
  clear(): Promise<void> {
    return this.storage.clear()
  }
  
  length(): Promise<number> {
    return this.storage.length()
  }
  
  keys(): Promise<string[]> {
    return this.storage.keys()

  }
}