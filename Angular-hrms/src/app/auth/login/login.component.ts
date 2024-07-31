import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userData: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit() { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    let user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(user).subscribe((res) => {
      console.log('logged In successfully', res);
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.router.navigate(['/dashboard']);

    }, (error: any) => {
      this.toastr.error(error.error.msg);
      console.log(error);
    })
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }
}
