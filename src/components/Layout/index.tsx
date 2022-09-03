import React from 'react';
import { object } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { matchRoutes, renderRoutes, RouteConfig } from 'react-router-config';

import Header from '../Header';
import MetaRenderer from '../MetaRenderer';
import { IRouteConfig } from '../../routes';

import './style.scss';

export interface LayoutProps {
  route: IRouteConfig
}
export default function Layout(props: LayoutProps) {
  const { route } = props || {};
  const { pathname } = useLocation();
  const [matchedRoute]: IRouteConfig[] = matchRoutes(route.routes as RouteConfig[], pathname);

  return (
    <div className="layout">
      <MetaRenderer meta={matchedRoute?.route?.meta} />
      <Header />
      <div className="layout-content">
        {renderRoutes(route.routes)}
      </div>
    </div>
  )
}

Layout.propTypes = {
  route: object,
};
