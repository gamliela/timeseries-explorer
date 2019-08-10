import {observable} from "mobx";

export class AppModel {
  @observable version: string = '1.0.0';
}
