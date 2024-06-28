import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { VoterService } from './voter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.scss'],
})
export class VoterComponent {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private voterService: VoterService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
        dob: ['', Validators.required],
        aadhar_no: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        address: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');

    if (
      password &&
      password_confirmation &&
      password.value !== password_confirmation.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
  submitRegistrationForm() {
    if (this.registrationForm.valid) {
      this.voterService.registerVoter(this.registrationForm.value).subscribe(
        (response) => {
          console.log('Registration successful!', response);
          alert('Registration successful!');
          this.router.navigate(['/voter/login']);
          this.registrationForm.reset();
        },
        (error) => {
          // alert('Registration failed! Please try again.');
          console.error('Registration failed!', error);
          console.log(error);
          if (error.error && error.error.errors) {
            for (const key of Object.keys(error.error.errors)) {
              const control = this.registrationForm.get(key);
              if (control) {
                control.setErrors({ serverError: error.error.errors[key][0] });
              }
            }
          }
        }
      );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
