import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  loginForm!: FormGroup;
  serverError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.adminService.loginAdmin(this.loginForm.value).subscribe(
        (response: any) => {
          alert('Login successful!');
          localStorage.setItem('token', response.token);
          localStorage.setItem('admin', JSON.stringify(response));
          this.router.navigate(['/admin/admin-dashboard']);
          this.loginForm.reset();
        },
        (error: any) => {
          // alert('Login failed! Please try again.');
          if (error.error && error.error.message) {
            this.serverError = error.error.message;
          } else if (error.error && error.error.errors) {
            for (const key of Object.keys(error.error.errors)) {
              const control = this.loginForm.get(key);
              if (control) {
                control.setErrors({ serverError: error.error.errors[key][0] });
              }
            }
          } else {
            this.serverError = 'An unexpected error occurred.';
          }
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
