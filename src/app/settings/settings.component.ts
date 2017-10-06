import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {

  disabled = false;
  max = 255;
  min = -255;
  step = 1;
  value = 0;
  bValue: number;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  onBrightnessChange(e) {
    this.bValue = e.value;
  }

  setBrightness() {
    this.imageService.setBrightness(this.bValue);
  }
}
