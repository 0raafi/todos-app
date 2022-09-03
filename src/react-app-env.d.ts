/// <reference types="react-scripts" />


declare interface ILocalData {
  store: any,
  dispatch: any
}

declare interface IHeaderAction<ActionProps> {
  title: string;
  actionProps?: ActionProps;
}

declare type Type = 'primary' | 'secondary' | 'danger' | 'success';