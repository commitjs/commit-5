export interface IRoute {
  path: string;
  component?: any;
  loadComponent?: () => any;
}
