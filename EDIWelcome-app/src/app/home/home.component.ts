import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authetication.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading2 = true;
  name: string;
  locationpath = '';
  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
      
     }

  ngOnInit() {
    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd ){ 
        console.log(routerData.url)
         if(routerData.url === '/home'){
            this.loading2 = false;
         }
      } 
    })
      this.authenticationService.getLoggedInUser()
        .subscribe(
            data => {
              this.name = data.name;
            });
  }
}
