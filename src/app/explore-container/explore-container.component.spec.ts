import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreContainerComponent } from './explore-container.component';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

describe('ExploreContainerComponent', () => {
  let component: ExploreContainerComponent;
  let fixture: ComponentFixture<ExploreContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(new Object()).compileComponents();

    fixture = TestBed.createComponent(ExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
