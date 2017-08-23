import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.styl']
})
export class ImagePreviewComponent implements OnInit {

  image: any;

  constructor() { }

  ngOnInit() {
  }

  handleDrop(e) {
    var files:File = e.dataTransfer.files;
    Object.keys(files).forEach((key) => {
      if(files[key].type === "image/png" || files[key].type === "image/jpeg") {
        this.image = (files[key]);
        console.log(this.image.path)
      }
      else {
        alert("File must be a PNG or JPEG!");
      }
    });

    return false;
  }



}
