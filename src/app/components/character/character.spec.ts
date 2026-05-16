import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    fixture.componentInstance.character = {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      skin_color: 'fair',
    };
    fixture.detectChanges();
  });

  it('should show the correct character name', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="character-card"] [data-testid="card-title"]').textContent).toContain('Luke Skywalker');
  });

  it('should show the correct character gender', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-1"]').textContent).toContain('male');
  });

  it('should show the correct character birth year', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-2"]').textContent).toContain('19BBY');
  });

  it('should show the correct character eye color', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-3"]').textContent).toContain('blue');
  });

  it('should show the correct character skin color', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-4"]').textContent).toContain('fair');
  });
});
