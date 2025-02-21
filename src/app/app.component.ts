import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Agent';
  apiulr = environment.apiUrl
  http = inject(HttpClient)
  ngOnInit(): void {
    console.log(`us`);
    this.getData()
    console.log(this.baseUrl);
    
    
  }
  private baseUrl = environment.apiUrl; // API URL ni environment.ts dan olish

  getData() {
    return this.http.get(`${this.baseUrl}`);
  }
  
  
}
