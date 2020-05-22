import {Answer} from './answer';

export class Question {
  modelSubjectId: string;
  subSort: number;
  module: string;
  subCode: string;
  title: string;
  standard: string;
  execDesc: string;
  options: string;
  maxscore: number;
  deductDesc: string;
  optRela: string;
  resOptList: Answer[];
  last: boolean;
  showNextBtn: boolean;
  showPreviousBtn: boolean;
  subjectid: string;
  code: number;
  optResult: string;
  optRelaFa: string;
  situDesc: string;
  picCount: number;
  vidCount: number;
  picMaxwidth: number;
  picMaxheight: number;
  picName: string;
  vidName: string;
}
