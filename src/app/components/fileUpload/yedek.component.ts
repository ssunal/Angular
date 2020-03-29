import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {HttpClient, HttpEventType} from "@angular/common/http";

const uploadAPI = 'http://192.168.0.4:5000/fu/upload'; // better use a service class

@Component({
  selector: 'app-upload',
  template: '<div class="container">\n' +
    '  <input type="file" name="file" ng2FileSelect [uploader]="uploader" />\n' +
    '  <button type="button" class="btn btn-success btn-s"\n' +
    '          (click)="uploader.uploadAll()"\n' +
    '          [disabled]="!uploader.getNotUploadedItems().length" >\n' +
    '    Upload\n' +
    '  </button>\n' +
    '\n' +
    '</div>\n',
  styleUrls: ['../../../assets/css/style.css']
})
export class FileUploadComponent implements OnInit {
  constructor(private http: HttpClient) { }
  title = 'ng8fileuploadexample';
  uploadedFilePath: string = null;
  previewUrl:any = null;
  fileData: File = null;
  url = 'http://192.168.0.4:5000/fu/upload';
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'dosya' });
  fileUploadProgress: any;

  fileProgress(fileInput: any) {
    this.fileUploadProgress='0%';
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  onSubmit() {
    /* const formData = new FormData();
     formData.append('dosya', this.fileData);
     this.http.post('http://192.168.0.4:5000/fu/upload', formData)
       .subscribe(res => {
         console.log(res);
         this.uploadedFilePath = './uploads';
         alert('SUCCESS !!');
       })*/
    const formData = new FormData();
    formData.append('dosya', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post('http://192.168.0.4:5000/fu/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if(events.type === HttpEventType.Response) {
          //this.fileUploadProgress = '';
          console.log(events.body);
          alert('SUCCESS !!');
        }

      })
  }
  preview() {
    // Show preview

    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return this.fileUploadProgress='type is not valid';
    } else {
      console.log('done!')
    }

    var reader = new FileReader();

    reader.readAsDataURL(this.fileData);

    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded successfully:', item, status, response);
      alert('Your file has been uploaded successfully');
    };
  }

}
