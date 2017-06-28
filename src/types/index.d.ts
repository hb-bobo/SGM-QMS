export interface States {
  [key: string]: any
}
// action 格式
export interface Action {
    type: string,
    payload: any
}


export interface Routes {
  path: string,
  component: any,
  routes?: Array<any>
}
export interface RoutesProps extends React.Props<any> {
  routes?: Array<any>;
}
