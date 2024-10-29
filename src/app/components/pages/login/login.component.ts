import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([''])
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (data => {
          console.log(data)
          localStorage.setItem('token_app', data.token)
          this.router.navigate(['/'])
        }),
        error: (error => {
          console.log(error)
          Swal.fire({
            title: 'Erro!',
            icon: 'error',
            showCancelButton: false,
            text: `${error.error.message}`,
            customClass: {
              confirmButton: 'btn btn-dark',
              title: 'fs-4',
              container: 'fs-6'
            }
          })
        })
      })
    }
  }

  error: boolean = false;
}
