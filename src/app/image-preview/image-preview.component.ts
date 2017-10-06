import { Component, OnInit} from '@angular/core';
import { ImageService } from '../services/image.service';
import 'fabric';
declare const fabric: any;

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.styl']
})
export class ImagePreviewComponent implements OnInit {

  image: any;
  file: File = null;
  canvas: any;

  constructor(private imageService: ImageService) {
    imageService.brightness$.subscribe( brightnessValue => {
      this.setBrightness(brightnessValue);
    });
  }


  ngOnInit() {
      fabric.Object.prototype.transparentCorners = false;
      this.canvas = new fabric.Canvas('canvas', { selection: false });
      const grid = 50;
      this.CreateBlackAndWhiteFilter();

      // create grid
      for (let i = 0; i < (500 / grid); i++) {
        this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 500], { stroke: '#ccc', selectable: false }));
        this.canvas.add(new fabric.Line([ 0, i * grid, 500, i * grid], { stroke: '#ccc', selectable: false }));
      }


      // render canvas to show grid
      this.canvas.renderAll();
  }

  handleDrop(e) {
    this.file = e.dataTransfer.files[0];
    const reader = new FileReader();
    //const filter = new fabric.Image.filters.Grayscale();

    reader.onload = (imgFile) => {
      console.log(imgFile);
      const data = imgFile.target['result'];
      fabric.Image.fromURL(data, (img) => {
        const imgObject = img.set({
          left: 0,
          top: 0,
          angle: 0
        }).scale(1);
        //img.filters.push(filter);
        //img.applyFilters();

        this.canvas.add(imgObject)
          .renderAll()
          .setActiveObject(imgObject)
          .toDataURL({format: 'png', quality: 0.8});

        this.image = img;
      });
    };
    reader.readAsDataURL(this.file);

    return false;
  }

  setBrightness( value ) {
    if ( typeof(this.image.filters[1]) === 'undefined') {
      const filter = new fabric.Image.filters.Redify({
        brightness: value
      });
      this.image.filters.push(filter);
    } else {
      this.image.filters[1].brightness = value;
    }

    // Apply filter, then rerender the canvas
    this.image.applyFilters( (img) => {
      this.canvas.renderAll();
    });
  }

  blackAndWhiteFilter() {
    this.image.filters.push(
    new fabric.Image.filters.BlackAndWhite(this.image)
  );
  console.log(this.image);
  this.image.applyFilters( (img) => {
      this.canvas.renderAll();
    });
  }


  CreateBlackAndWhiteFilter() {
    fabric.Image.filters.BlackAndWhite = fabric.util.createClass({

      type: 'BlackAndWhite',

      applyTo: function(canvasEl) {
        const context   =   canvasEl.getContext('2d');
        const imageData =   context.getImageData(0, 0, canvasEl.width, canvasEl.height);
        const data      =   imageData.data;

        for ( let i = 0; i < data.length; i += 4 ) {

          const val = data[i] + data[i + 1] + data[i + 3];

          if ( val < (128 * 3) ) {
            data[i] = 1;
            data[i + 1] = 1;
            data[i + 2] = 1;
          } else {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }
        context.putImageData(imageData, 0, 0);
      }
    });
  // this.image.filters.push(
  //   new fabric.Image.filters.BlackAndWhite(this.image)
  // );
  // console.log(this.image);
  // this.image.applyFilters( (img) => {
  //     this.canvas.renderAll();
  //   });
  }
}
