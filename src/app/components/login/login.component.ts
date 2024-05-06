import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http:HttpClient, private auth: AuthService, private router: Router) {}

  async login () {
    // DAS ALLES KANN WEGGELASSEN WERDEN; WEIL WIR DAS JETZT IN EINER FUNKTION AUSGELAGERT HABEN (loginWithUsernameAndPassword)
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // const raw = JSON.stringify({
    //   username: this.username,
    //   password: this.password,
    // });

    // const requestOptions: RequestInit = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };

    try {
      let response:any = await this.auth.loginWithUsernameAndPassword(this.username, this.password);
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_id', response.user_id);
      this.router.navigate(['/todos']);

    // let response = await fetch(environment.baseUrl + '/login/', requestOptions)
    // let json = await response.json()
    //   localStorage.setItem('token', json.token)
    //   console.log(json)
    // Redirect to the home page
      
    } catch (error) {
      alert('Login failed');
      console.error('Error:', error);
    }

  }

// AUSGELAGERT IN EINEN SERVICE
  // loginWithUsernameAndPassword (username: string, password: string) {
  //   const url = environment.baseUrl + '/login/';
  //   const body = {
  //     'username': username,
  //     'password': password
  //   };
  //   return lastValueFrom(this.http.post(url, body));
  // }


  ngOnInit(): void {}
}
