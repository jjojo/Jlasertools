import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

/* Routing */
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

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
    ImagePreviewComponent
  ],
  imports: [
		RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
