import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {FingerprintServiceService} from "./shared/fingerprint-service.service";
import {User} from "../shared/Models/user";

@Component({
  selector: 'app-fingerprint-verification',
  templateUrl: './fingerprint-verification.component.html',
  styleUrls: ['./fingerprint-verification.component.scss'],
})
export class FingerprintVerificationComponent {
  @Output() idVerified = new EventEmitter();
  @Output() modalCanceled = new EventEmitter();
  fingerprintImageUrl: string = null;
  fingerprintImage: File;
  beneficiaryId: number;
  beneficiary: User;
  fingerPrints: Array<string> = [
    'FINGERPRINT_THUMB_RIGHT',
    'FINGERPRINT_INDEX_RIGHT',
    'FINGERPRINT_THUMB_LEFT',
    'FINGERPRINT_INDEX_LEFT',
  ];
  idsDifference: string[] = [];
  notificationMessage: string;
  errormessage: string;
  takingFingerprints = false;
  scanType: 'Verification' | 'Enrollment' = 'Verification';
  scanningFingerprints = false;
  verifyIndex = 0;
  selectedFinger: string;
  gender: Dictionary[] = [
    {key: 'MALE', value: 'his'},
    {key: 'FEMALE', value: 'her'},
  ];
  finalizeTheScan = false;

  constructor(
    private patientService: FingerprintServiceService,
    private translate: TranslateService,
  ) {
  }

  @Input()
  set _beneficiaryId(beneficiaryId: number) {
    this.beneficiaryId = beneficiaryId;
    this.init();
  }

  init() {
    this.openModal();
    this.getBeneficiary(0);
    setTimeout(()=>{
      this.idVerified.emit();
      this.closeModal();
    }, 3000);
  }

  openModal() {
    const element: HTMLElement = document.getElementById(
      'triggerbutton',
    ) as HTMLElement;
    element.click();
  }

  closeModal() {
    const element: HTMLElement = document.getElementById(
      'closetrigger',
    ) as HTMLElement;
    element.click();
  }

  triggerFinalizeScan() {
    const element: HTMLElement = document.getElementById(
      'finalizescanbtn',
    ) as HTMLElement;
    element.click();
  }

  getBeneficiary(step: number) {
    this.patientService.getBeneficiaryDetails(this.beneficiaryId).subscribe(
      res => {
        this.beneficiary = res;

        this.scanQueue(step, this.beneficiary);
      },
      error2 => {
        this.notificationMessage = null;
        this.errormessage = error2.message;
      },
    );
  }

  scanQueue(step: number, beneficiary: User) {
    const availableIds = new Set(Object.keys(beneficiary.identifications));
    this.idsDifference = this.fingerPrints.filter(x => !availableIds.has(x));
    if (this.idsDifference.length > 0) {
      //member has no fingerprints taken
      this.errormessage = null;
      this.notificationMessage =
        `${this.beneficiary.first_name} ${this.beneficiary.last_name} ` +
        `has not completed the fingerprint enrollment for ${
          this.idsDifference.length
          } fingers`;
      this.takingFingerprints = false;
      this.scanType = 'Enrollment';
      if (step === 1) {
        this.startTakingFingerprints();
      }
    } else {
      //member has fingerprints, kindy verify
      this.takingFingerprints = false;
      this.scanningFingerprints = false;
      this.errormessage = null;
      this.notificationMessage =
        `${this.beneficiary.first_name} ${this.beneficiary.last_name} ` +
        `should verify ${
          this.gender.find(gg => gg.key === this.beneficiary.gender).value
          } fingerprints`;
      this.scanType = 'Verification';
    }
  }

  startScanningFingerprints() {
    this.takingFingerprints = false;
    this.scanningFingerprints = true;
    if (this.scanType === 'Enrollment') {
      this.selectedFinger = this.translate.instant(
        `notification.fingerprint.${this.idsDifference[0]}`,
      );
      this.errormessage = null;
      this.notificationMessage = this.translate.instant(
        'notification.fingerprint.scanning',
        {finger: this.selectedFinger},
      );
      this.recordNewFingerprint();
    } else {
      this.selectedFinger = this.translate.instant(
        `notification.fingerprint.${this.fingerPrints[this.verifyIndex]}`,
      );
      this.errormessage = null;
      this.notificationMessage = this.translate.instant(
        'notification.fingerprint.scanning',
        {finger: this.selectedFinger},
      );
      this.verifyFingerprint();
    }
  }

  cancelModal() {
    this.modalCanceled.emit();
    this.closeModal();
  }

  startTakingFingerprints() {
    this.takingFingerprints = true;
    this.scanningFingerprints = false;
    if (this.scanType === 'Enrollment') {
      this.selectedFinger = this.translate.instant(
        `notification.fingerprint.${this.idsDifference[0]}`,
      );
      this.errormessage = null;
      this.notificationMessage = this.translate.instant(
        'notification.fingerprint.take',
        {
          name: this.beneficiary.first_name + this.beneficiary.last_name,
          finger: this.selectedFinger,
          gender: this.gender.find(gg => gg.key === this.beneficiary.gender)
            .value,
        },
      );
    } else {
      this.selectedFinger = this.translate.instant(
        `notification.fingerprint.${this.fingerPrints[this.verifyIndex]}`,
      );
      this.errormessage = null;
      this.notificationMessage = this.translate.instant(
        'notification.fingerprint.take',
        {
          name: this.beneficiary.first_name + this.beneficiary.last_name,
          finger: this.selectedFinger,
          gender: this.gender.find(gg => gg.key === this.beneficiary.gender)
            .value,
        },
      );
    }
  }

  verifyFingerprint() {
    this.patientService.getPatientFingerPrint().subscribe(
      res => {
        this.scanningFingerprints = false;
        this.fingerprintImage = res;
        this.generateImageUrl();
        this.errormessage = null;
        this.notificationMessage = 'Scan complete';
        this.finalizeTheScan = true;
        setTimeout(() => this.triggerFinalizeScan(), 500);
      },
      error2 => {
        this.scanningFingerprints = false;
        this.notificationMessage = null;
        this.errormessage = error2.message;
        if (this.errormessage === '' || this.errormessage == null) {
          this.errormessage =
            'Error: either the scanning device is not connected or timeout error';
        }
      },
    );
  }

  PostVerifyFingerprint() {
    this.errormessage = null;
    this.notificationMessage = 'verifying...';
    this.patientService
      .verifyFingerPrint(
        this.beneficiaryId,
        this.fingerPrints[this.verifyIndex],
        this.fingerprintImage,
      )
      .subscribe(
        res => {
          this.finalizeTheScan = false;
          if (res >= 10) {
            this.notificationMessage = 'Fingerprints matched!';
            //emit an event to open treatment
            this.closeModal();
            this.idVerified.emit(true);
          } else {
            this.notificationMessage = null;
            this.errormessage = this.translate.instant(
              'notification.finger_print_not_matching',
            );
            this.verifyIndex++;
            if (this.verifyIndex >= this.fingerPrints.length) {
              this.errormessage = 'Kindly contact m-tiba for help';
              setTimeout(() => this.closeModal(), 4000);
            }
          }
        },
        error2 => {
          this.finalizeTheScan = false;
          this.notificationMessage = null;
          this.errormessage = this.translate.instant(
            'notification.error_veryfying_finger_print',
          );
        },
      );
  }

  recordNewFingerprint() {
    this.patientService.getPatientFingerPrint().subscribe(
      res => {
        this.scanningFingerprints = false;
        this.fingerprintImage = res;
        this.generateImageUrl();
        this.errormessage = null;
        this.notificationMessage = 'Scan complete';
        this.finalizeTheScan = true;
      },
      error2 => {
        this.scanningFingerprints = false;
        this.notificationMessage = null;
        this.errormessage = error2.message;
        if (this.errormessage === '' || this.errormessage == null) {
          this.errormessage =
            'Error: either the scanning device is not connected or timeout error';
        }
      },
    );
  }

  postRecordNewFingerprint() {
    this.errormessage = null;
    this.notificationMessage = 'kindly wait as we record the data';
    this.patientService
      .addIdentificationType(
        this.beneficiaryId,
        this.idsDifference[0],
        this.fingerprintImage,
      )
      .subscribe(
        res => {
          this.finalizeTheScan = false;
          this.notificationMessage = this.translate.instant(
            'notification.finger_print_successfully_recorded',
          );
          this.getBeneficiary(1);
        },
        error2 => {
          this.finalizeTheScan = false;
          this.notificationMessage = null;
          this.errormessage = error2.message;
        },
      );
  }

  finalizeScan() {
    this.fingerprintImageUrl = null;
    if (this.scanType === 'Enrollment') {
      this.postRecordNewFingerprint();
    } else {
      this.PostVerifyFingerprint();
    }
  }

  generateImageUrl() {
    const reader = new FileReader();
    reader.readAsDataURL(this.fingerprintImage);
    reader.onload = () => (this.fingerprintImageUrl = reader.result);
  }
}

export class Dictionary {
  key: string;
  value: string;
}
