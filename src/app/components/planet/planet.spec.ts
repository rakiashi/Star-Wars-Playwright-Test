import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetComponent } from './planet.component';

describe('PlanetComponent', () => {
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetComponent);
    fixture.componentInstance.planet = {
      name: 'Alderaan',
      population: '2000000000',
      climate: 'temperate',
      gravity: '1 standard',
    };
    fixture.detectChanges();
  });

  it('should show the correct planet name', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="planet-card"] [data-testid="card-title"]').textContent).toContain('Alderaan');
  });

  it('should show the correct planet population', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-1"]').textContent).toContain('2000000000');
  });

  it('should show the correct planet climate', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-2"]').textContent).toContain('temperate');
  });

  it('should show the correct planet gravity', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="row-3"]').textContent).toContain('1 standard');
  });
});
