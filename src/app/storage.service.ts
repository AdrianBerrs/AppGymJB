import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Exercise, Session } from './tab1/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage : Storage
  constructor() {
    this.storage = new Storage({dbKey: "gymApp", name: "gymappname", description: "desc gym app", })
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

  private async getSessions(): Promise<Session[]> {
    return await this.storage.get("sessions")
  }

  async removeSession(sessionId?: string): Promise<void> {
    const sessions: Session[] = await this.getAllSessionByUser()

    const sessionsUpdated = sessions.map((session) => {
      if (session._id?.toString() == sessionId?.toString()) {
        return false
      }

      return true
    })

    this.storage.set("sessions", sessionsUpdated)
  }

  async updateSession(sessionToUpdate: Session): Promise<void> {
    const sessions: Session[] = await this.getAllSessionByUser()

    if (sessions.length == 0) {
      sessions.push(sessionToUpdate)
    }

    const sessionsUpdated = sessions.map((session) => {
      if (session._id?.toString() == sessionToUpdate._id?.toString()) {
        return sessionToUpdate
      }

      return session
    })

    this.storage.set("sessions", sessionsUpdated)
  }

  async updateExercise(sessionId: string, exerciseToUpdate: Exercise): Promise<void> {
    const session = await this.getSessionById(sessionId)
    if (!session) {
      return
    }

    session.exercises = session?.exercises.map((exercise) => {
      if(exercise._id?.toString() == exerciseToUpdate._id?.toString()) {
        return exerciseToUpdate
      }

      return exercise
    })

    await this.updateSession(session)
  }

  async removeExercise(sessionId: string, exerciseId: string): Promise<void> {
    const session = await this.getSessionById(sessionId)
    if (!session) {
      return
    }

    session.exercises = session?.exercises.filter((exercise) => {
      if(exercise._id?.toString() ==exerciseId.toString()) {
        return false
      }

      return true
    })

    await this.updateSession(session)
  }

  async creaseSession(session: Session): Promise<Session> {
    if (session._id) {
      throw Error("Session already exists.")
    }
    
    session._id = uuidv4()
    session.date = new Date()

    session.exercises = session.exercises.map((exercise: Exercise): Exercise => {
      if (!exercise._id) {
        exercise._id = uuidv4()
      }
      return exercise
    })

    await this.updateSession(session)

    return session
  }

  async getSessionById(sessionId: string): Promise<Session|null> {
    const sessions = await this.getAllSessionByUser()
    const session = sessions.filter((session) => (session._id?.toString() == sessionId.toString()))
    return session[0] ?? null
  }

  async getAllSessionByUser(): Promise<Session[]> {
    const sessions = await this.getSessions()

    return sessions.filter((session) => !!session)
  }
}