import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrls: ['./dashoard.component.css']
})
export class DashoardComponent {

  constructor( private router: Router,
               private authService: AuthService ) { }

  retornarLogin() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
