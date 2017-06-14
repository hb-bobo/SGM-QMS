export interface States {
  [key: string]: any
}
export interface Routes {
  path: string,
  component: any,
  routes?: Array<any>
}
export interface RoutesProps extends React.Props<any> {
  routes?: Array<any>;
}
