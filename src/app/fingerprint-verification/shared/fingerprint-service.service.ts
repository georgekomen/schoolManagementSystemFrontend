import { Injectable } from '@angular/core';
import {ConfigService} from "../../../config/ConfigService";
import {BaseHttpService} from "../../../shared/base.http.service";
import {  BehaviorSubject,  Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FingerprintServiceService {

  constructor(private http: BaseHttpService<any>
  ) {

  }

  getBeneficiaryDetails(beneficiaryId): Observable<any> {
    return this.http.get(
      `${ConfigService.baseUrl}/beneficiaries/${beneficiaryId}`,
    );
  }

  getPatientFingerPrint(): Observable<File> {
    return this.http.download_no_auth(`http://localhost:8088/biometrics/capture`);
  }

  verifyFingerPrint(beneficiaryId, identificationType, image): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image);

    return this.http.upload(`${ConfigService.baseUrl}/beneficiaries/${beneficiaryId}/identifications/${identificationType}/auth`, formData);
  }

  addIdentificationType(beneficiaryId, photoType, image): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image);
    return this.http.upload(
      `${
        ConfigService.baseUrl
        }/beneficiaries/${beneficiaryId}/photos/${photoType}`,
      formData,
    );
  }
}
