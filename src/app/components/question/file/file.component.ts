import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  bizKey: string;
  @Input()
  vidCount: number;
  @Input()
  picCount: number;
  @Input()
  maxWidth: number;
  @Input()
  maxHeight: number;
  @Input()
  readonly: boolean;
  @Input()
  vidName: string;
  @Input()
  picName: string;
  @Input()
  picMaxCount: number;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.ngOnInit();
  }

  ngOnInit(): void {
    console.log('key:' + this.bizKey);
    $('#uploadFileUploader').webuploader({
      id: 'uploadFile',
      bizKey: this.bizKey, // '1253704565781671936-09442619fe0f497992df089eda3581fe',
      bizType: 'projLineSuvSub_file',
      readonly: this.readonly,
      returnPath: false,
      filePathInputId: '',
      fileNameInputId: '',
      uploadType: 'media',
      maxFileSize: 500 * 1024 * 1024,
      imageAllowSuffixes: '.gif,.bmp,.jpeg,.jpg,.ico,.png,.tif,.tiff,',
      mediaAllowSuffixes: '.flv,.swf,.mkv,webm,.mid,.mov,.mp3,.mp4,.m4v,.mpc,.mpeg,.mpg,.swf,.wav,.wma,.wmv,.avi,.rm,.rmi,.rmvb,.aiff,.asf,.ogg,.ogv,',
      fileAllowSuffixes: '.doc,.docx,.rtf,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.vsd,.txt,.md,.xml,.rar,.zip,7z,.tar,.tgz,.jar,.gz,.gzip,.bz2,.cab,.iso,.ipa,.apk,',
      chunked: true,
      chunkSize: 10485760,
      threads: 1,
      maxUploadNum: 300,
      imageMaxWidth: 1024,
      imageMaxHeight: 768,
      service: {
        upload: '/ycmj/a/file/upload',
        download: '/ycmj/a/file/download/',
        fileList: '/ycmj/a/file/fileList'
      },
      extendParams: {},
      isLazy: false,
      preview: ''
    });
    $('#uploadImageUploader').webuploader({
      id: 'uploadImage',
      bizKey: this.bizKey,
      bizType: 'projLineSuvSub_image',
      readonly: this.readonly,
      returnPath: false,
      filePathInputId: '',
      fileNameInputId: '',
      uploadType: 'image',
      maxFileSize: 500 * 1024 * 1024,
      imageAllowSuffixes: '.gif,.bmp,.jpeg,.jpg,.ico,.png,.tif,.tiff,',
      mediaAllowSuffixes: '.flv,.swf,.mkv,webm,.mid,.mov,.mp3,.mp4,.m4v,.mpc,.mpeg,.mpg,.swf,.wav,.wma,.wmv,.avi,.rm,.rmi,.rmvb,.aiff,.asf,.ogg,.ogv,',
      fileAllowSuffixes: '.doc,.docx,.rtf,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.vsd,.txt,.md,.xml,.rar,.zip,7z,.tar,.tgz,.jar,.gz,.gzip,.bz2,.cab,.iso,.ipa,.apk,',
      chunked: false,
      chunkSize: 10485760,
      threads: 1,
      maxUploadNum: this.picMaxCount,
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
  ngOnDestroy(): void {
    const elements = document.querySelectorAll('div[id^="rt_rt_"]');
    for (let i = 0; i < elements.length; i ++ ) { elements[i].parentNode.removeChild(elements[i]); }
  }
}
