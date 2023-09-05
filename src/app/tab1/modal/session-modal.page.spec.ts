import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { SessionModalPage } from './session-modal.page';

describe('SessionModalPage', () => {
  let component: SessionModalPage;
  let fixture: ComponentFixture<SessionModalPage>;
  let modalController: ModalController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SessionModalPage],
      imports: [IonicModule.forRoot()],
      providers: [ModalController],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionModalPage);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    spyOn(modalController, 'dismiss').and.returnValue(Promise.resolve(true));

    component.closeModal();

    expect(modalController.dismiss).toHaveBeenCalled();
  });

  it('should add exercise', () => {
    component.newExerciseName = 'Exercise 1';

    component.addExercise();

    expect(component.exercises.length).toBe(1);
    expect(component.exercises[0].name).toBe('Exercise 1');
    expect(component.newExerciseName).toBe('');
  });
});