import { Test1Component } from "./test1.component";
import { IRoute } from './interfaces/route';

export const appRoutes: IRoute[] = [
  {
    path: '/',
    component: Test1Component
  },
  {
    path: '/test-2',
    loadComponent: () =>
      import('./test2.component').then(m => m.Test2Component)
  }
];
