import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";

const uploadAPI = 'http://192.168.0.4:5000/fu/upload'; // better use a service class

@Component({
  selector: 'app-upload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class FileUploadComponent implements OnInit {
  title = 'ng8fileuploadexample';
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'dosya' });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded successfully:', item, status, response);
      alert('Your file has been uploaded successfully');
    };
  }

}
