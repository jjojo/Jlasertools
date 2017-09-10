import { Component, OnInit} from '@angular/core';
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

  constructor() { }

  ngOnInit() {

      this.canvas = new fabric.Canvas('canvas', { selection: false });
      const grid = 50;

      // create grid
      for (let i = 0; i < (500 / grid); i++) {
        this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 500], { stroke: '#ccc', selectable: false }));
        this.canvas.add(new fabric.Line([ 0, i * grid, 500, i * grid], { stroke: '#ccc', selectable: false }));
      }

      // render grid
      this.canvas.renderAll();
  }

  handleDrop(e) {
    this.file = e.dataTransfer.files[0];
    const reader = new FileReader();
    const filter = new fabric.Image.filters.Grayscale();

    reader.onload = (imgFile) => {
      console.log(imgFile);
      const data = imgFile.target['result'];
      fabric.Image.fromURL(data, (img) => {
        const oImg = img.set({
          left: 0,
          top: 0,
          angle: 0
        }).scale(1);
        img.filters.push(filter);
        img.applyFilters();
        this.canvas.add(oImg).renderAll();
        const a = this.canvas.setActiveObject(oImg);
        const dataURL = this.canvas.toDataURL({format: 'png', quality: 0.8});
      });
    };
    reader.readAsDataURL(this.file);

    return false;
  }
}
