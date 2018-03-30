import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import firebaseConfig from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;    
  }

  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
  }
}
