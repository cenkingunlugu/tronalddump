import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
    ]
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(UserService);
    spyOn(localStorage, 'getItem').and.callThrough();
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run setToken method as expected', () => {
    const token = 'fake-token';
    service.setToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('TTTOKEN', token);
  });

  it('should run isLogged method as expected', () => {
    localStorage.removeItem('TTTOKEN');
    const isLogged = service.isLogged();
    expect(isLogged).toBe(false);
    const token = 'fake-token';
    service.setToken(token);
    const shouldBeLogged = service.isLogged();
    expect(shouldBeLogged).toBe(true);
  });

  it('should run login as expected', () => {
    service.login('admin', 'admin').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.userBase}login`);

    expect(req.request.method).toBe('POST');
    const reqBody = JSON.parse(req.request.serializeBody().toString());

    expect(reqBody.username).toBe('admin');
    expect(reqBody.password).toBe('admin');


    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush({});
  });

});
