import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { IonicModule } from '@ionic/angular';
import { PlatformRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Session } from './tab1/types';

TestBed.initTestEnvironment(IonicModule, new PlatformRef() );

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],

      declarations: [
        StorageService
      ],
    })
    service = new StorageService()
    service.clear()
  });

  it('should be created an session with one exercise', async () => {
    const createSessionObj: Session = {
      date: new Date(),
      exercises: [
        {
          name: "ex1",
          checked:false
        }
      ],
      expanded: false,
      name: "Test session 1",
    }

    const session = await service.creaseSession(createSessionObj)

    expect(session._id).not.toBeUndefined();
    const sessions = await service.getAllSessionByUser()
    expect(sessions.length).toBe(1);

    const foundSession = await service.getSessionById(session._id?.toString() ?? '')
    expect(foundSession).not.toBeNull();

    expect(foundSession?.exercises.length).toBe(1);
  });

  it('should be created an session and update an exercise', async () => {
    const createSessionObj: Session = {
      date: new Date(),
      exercises: [
        {
          name: "ex1",
          checked:false
        }
      ],
      expanded: false,
      name: "Test session 1",
    }

    const session = await service.creaseSession(createSessionObj)

    expect(session._id).not.toBeUndefined();
    const sessions = await service.getAllSessionByUser()
    expect(sessions.length).toBe(1);

    const foundSession = await service.getSessionById(session._id?.toString() ?? '')
    expect(foundSession).not.toBeNull();

    expect(foundSession?.exercises.length).toBe(1);
    expect(foundSession?.exercises[0].checked).toBe(false);

    if (!foundSession) {
      throw Error("exit test")
    }
    const exercise = foundSession.exercises[0]
    exercise.checked = true
    await service.updateExercise(foundSession?._id ?? '', exercise)

    const foundSession2 = await service.getSessionById(session._id?.toString() ?? '')
    expect(foundSession2).not.toBeNull();
    
    expect(foundSession2?.exercises[0].checked).toBe(true);

  });

  it('should be created two sessions', async () => {
    const createSessionObj: Session = {
      date: new Date(),
      exercises: [
        {
          name: "ex1",
          checked:false
        }
      ],
      expanded: false,
      name: "Test session 1",
    }

    const session = await service.creaseSession(createSessionObj)

    expect(session._id).not.toBeUndefined();
    const sessions = await service.getAllSessionByUser()
    expect(sessions.length).toBe(1);

    const foundSession = await service.getSessionById(session._id?.toString() ?? '')
    expect(foundSession).not.toBeNull();

    expect(foundSession?.exercises.length).toBe(1);
    expect(foundSession?.exercises[0].checked).toBe(false);

    if (!foundSession) {
      throw Error("exit test")
    }

    const session2 = await service.creaseSession(createSessionObj)
    expect(session2._id).not.toBeUndefined();
    const sessions2 = await service.getAllSessionByUser()
    expect(sessions2.length).toBe(2);

    const foundSession3 = sessions2[0]
    expect(foundSession3).not.toBeNull();

    expect(foundSession3?.exercises.length).toBe(1);
    expect(foundSession3?.exercises[0].checked).toBe(false);

  });

});
