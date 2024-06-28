import { VoterService } from './../../../../voter.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aadhar-validate',
  templateUrl: './aadhar-validate.component.html',
  styleUrls: ['./aadhar-validate.component.scss'],
})
export class AadharValidateComponent {
  aadharNumber: string = '';
  @Output() validAadhar = new EventEmitter<boolean>();

  constructor(private VoterService: VoterService) {}

  validateAadhar() {
    this.VoterService.validateAadhar(this.aadharNumber).subscribe(
      (isValid: boolean) => {
        this.validAadhar.emit(isValid);
      },
      (error: any) => {
        console.error('Error validating Aadhar:', error);
        this.validAadhar.emit(false);
      }
    );
  }
}
