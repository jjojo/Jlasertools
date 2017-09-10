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
      let grid = 50;

      // create grid
      for (var i = 0; i < (600 / grid); i++) {
        this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false }));
        this.canvas.add(new fabric.Line([ 0, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false }))
      }
      
      // render grid
      this.canvas.renderAll();
  }

  handleDrop(e) {
    this.file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (imgFile) => {
      console.log(imgFile)
      const data = imgFile.target["result"];                    
      fabric.Image.fromURL(data, (img) => {
        let oImg = img.set({
          left: 0,
          top: 0,
          angle: 0
        }).scale(1);
        this.canvas.add(oImg).renderAll();
        var a = this.canvas.setActiveObject(oImg);
        var dataURL = this.canvas.toDataURL({format: 'png', quality: 0.8});
      });
    };
    reader.readAsDataURL(this.file);

    return false;
  }



}
