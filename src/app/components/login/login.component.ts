import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http:HttpClient, private auth: AuthService) {}

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
      let response = await this.auth.loginWithUsernameAndPassword(this.username, this.password);
      console.log(response);

    // let response = await fetch(environment.baseUrl + '/login/', requestOptions)
    // let json = await response.json()
    //   localStorage.setItem('token', json.token)
    //   console.log(json)
    // Redirect to the home page
      
    } catch (error) {
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
