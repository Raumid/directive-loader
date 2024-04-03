import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private apiService = inject(ApiService);

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmitForm():void {
    if(this.formLogin.valid)
      this.attempLogin();
    else {
      this.formLogin.markAllAsTouched();
    }
  }

  private attempLogin():void {
    this.apiService.login(this.formLogin.value).subscribe(
      {
        next: (data:any) => {
          alert("Bienvenido");
         
        },
        error: (error:any) => {
          alert("Usuario y/o contraseña incorrecta");
        }
      }
    );
  }

}
