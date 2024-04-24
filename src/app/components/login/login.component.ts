import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  async login() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      username: this.username,
      password: this.password,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try{
    let response = await fetch('http://127.0.0.1:8000/login/', requestOptions)
    let json = await response.json() 
      localStorage.setItem('token', json.token)
      console.log(response.body)
      // Redirect to the home page
    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }

  }

  ngOnInit(): void {}
}
