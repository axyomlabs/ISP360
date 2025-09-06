import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="breadcrumb-wrapper p-3 bg-light border-bottom">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <Breadcrumb.Item
              key={name}
              linkAs={Link}
              linkProps={{ to: routeTo }}
              active={isLast}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumb;