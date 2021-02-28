import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authetication.services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";


  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      });

      this.router.events.subscribe((routerData) => {
        if(routerData instanceof ResolveEnd ){ 
          console.log(routerData.url)
           if(routerData.url === '/'){
              this.loading = false;
           }
        } 
      })
  }

  get fieldControl() { return this.loginForm.controls; }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.fieldControl.username.value, this.fieldControl.password.value)
        .subscribe(
            data => {
              this.loading = true;
              this.router.navigate(['/home']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

}
