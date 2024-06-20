import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LhaFrontendFeatureAdminDashboardComponent } from './lha-frontend-feature-admin-dashboard.component';

describe('LhaFrontendFeatureAdminDashboardComponent', () => {
  let component: LhaFrontendFeatureAdminDashboardComponent;
  let fixture: ComponentFixture<LhaFrontendFeatureAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LhaFrontendFeatureAdminDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LhaFrontendFeatureAdminDashboardComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
