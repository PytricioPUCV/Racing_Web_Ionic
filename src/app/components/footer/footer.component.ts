import { Component, OnInit } from '@angular/core';
import { IonIcon, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, IonButton]
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}