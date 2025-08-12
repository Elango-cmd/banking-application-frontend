import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-disclaimers',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './disclaimers.component.html',
  styleUrl: './disclaimers.component.css'
})
export class DisclaimersComponent {

  lastUpdated: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.lastUpdated = this.getCurrentDate();
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toLocaleDateString();
  }

}
