import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageService } from './services/image.service';
import { MdSliderModule } from '@angular/material';

/* Routing */

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ImagePreviewComponent,
    SettingsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    MdSliderModule
  ],
  exports: [MdSliderModule],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
