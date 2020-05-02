import {Component, Input, OnInit} from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input()
  bizKey: string;
  @Input()
  picCount: number;
  @Input()
  maxWidth: number;
  @Input()
  maxHeight: number;
  @Input()
  readonly: boolean;
  constructor() { }

  ngOnInit(): void {
    $('#uploadImageUploader').webuploader({
      id: 'uploadImage',
      bizKey: this.bizKey,
      bizType: 'projLineSuvSub_image',
      readonly: this.readonly,
      returnPath: false,
      filePathInputId: '',
      fileNameInputId: '',
      uploadType: 'image',
      maxFileSize: 500*1024*1024,
      imageAllowSuffixes: '.gif,.bmp,.jpeg,.jpg,.ico,.png,.tif,.tiff,',
      mediaAllowSuffixes: '.flv,.swf,.mkv,webm,.mid,.mov,.mp3,.mp4,.m4v,.mpc,.mpeg,.mpg,.swf,.wav,.wma,.wmv,.avi,.rm,.rmi,.rmvb,.aiff,.asf,.ogg,.ogv,',
      fileAllowSuffixes: '.doc,.docx,.rtf,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.vsd,.txt,.md,.xml,.rar,.zip,7z,.tar,.tgz,.jar,.gz,.gzip,.bz2,.cab,.iso,.ipa,.apk,',
      chunked: false,
      chunkSize: 10485760,
      threads: 1,
      maxUploadNum: 300,
      imageMaxWidth: this.maxWidth,
      imageMaxHeight: this.maxHeight,
      service: {
        upload: '/ycmj/a/file/upload',
        download: '/ycmj/a/file/download/',
        fileList: '/ycmj/a/file/fileList'
      },
      extendParams: {},
      isLazy: false,
      preview: ''
    });
  }
}
