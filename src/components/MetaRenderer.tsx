import React from 'react';
import { Helmet } from 'react-helmet';

const MetaRenderer = (props: any) => {
  const { meta } = props;
  const { title, ...restMeta } = meta || {};

  return (
    <Helmet title={title}>
      {Object.keys(restMeta || {}).map((m) => (<meta key={`meta-${m}`} name={m} {...restMeta[m]} />))}
    </Helmet>
  )
}

export default MetaRenderer
