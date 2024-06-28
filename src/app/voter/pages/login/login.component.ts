import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { VoterService } from '../../voter.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private voterService: VoterService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.voterService.loginVoter(this.loginForm.value).subscribe(
        (response) => {
          alert('Login successful!');
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/voter/dashboard']);
          this.loginForm.reset();
        },
        (error) => {
          // alert('Login failed! Please try again.');
          if (error.error && error.error.errors) {
            for (const key of Object.keys(error.error.errors)) {
              const control = this.loginForm.get(key);
              if (control) {
                control.setErrors({ serverError: error.error.errors[key][0] });
              }
            }
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
