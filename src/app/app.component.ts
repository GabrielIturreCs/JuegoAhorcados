import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({

  // selector: 'app-root',
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, CommonModule , ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'serviceangular';
}
