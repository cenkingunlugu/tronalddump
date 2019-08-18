import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';
import { FakeQuoteListComponent } from '../favorites/favorites.component.spec';
import { NgxHmCarouselComponent } from 'ngx-hm-carousel';
import { FormsModule } from '@angular/forms';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let activatedRoute: ActivatedRoute;
  let service: QuotesService;
  let deviceService: DeviceDetectorService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TagsComponent,
        FakeQuoteListComponent,
        NgxHmCarouselComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: QuotesService, useValue: {
          getTagsDetail: () => of([])
        } },
        DeviceDetectorService,
        {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get: () => '',
                  },
              },
          },
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    service = TestBed.get(QuotesService);
    deviceService = TestBed.get(DeviceDetectorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isMobile).toBe(false);
  });

  it('should init as expected', () => {
    spyOn(service, 'getTagsDetail').and.callThrough();
    spyOn(deviceService, 'isMobile').and.returnValue(true);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('fake-tag');

    component.ngOnInit();
    expect(component.isMobile).toBe(true);
    expect(component.tagName).toBe('fake-tag');
    expect(service.getTagsDetail).toHaveBeenCalledWith(component.tagName);
  });
});
