import { RouteConfig } from 'react-router-config';
import loadable from '@loadable/component';

import Layout from '../components/Layout';

const Todos = loadable(() => import('./Todos'))

export interface IRouteConfig extends Omit<RouteConfig, "routes"> {
  meta?: any;
  routes?: IRouteConfig[] | undefined;
}

const routes: IRouteConfig[] = [
  {
    component: Layout,
    routes: [
      {
        path: ['/', '/todos'],
        component: Todos,
        meta: {
          title: 'Todos | Rakamin'
        }
      }
    ]
  }
];

export default routes;