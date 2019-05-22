import React from 'react';

import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import AdminIcon from '@material-ui/icons/Build';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Badge from '@material-ui/core/Badge';

import BoardPage from '/imports/ui/pages/BoardPage';
import ProfilePageContainer from '/imports/ui/containers/ProfilePageContainer';
import AdminPage from '/imports/ui/pages/AdminPage';
import Authorization from '/imports/ui/helpers/Authorization';

const Admin = Authorization(['admin']);

export const ROUTES = {
  user: [
    {
      text: "Board",
      link: "/",
      hasSubRoutes: false,
      component: BoardPage,
      icon: <ViewQuiltIcon />,
      retainSearchParams: ['query']
    },
    {
      text: "Profile",
      link: "/profile",
      hasSubRoutes: false,
      component: ProfilePageContainer,
      icon: <PermIdentityIcon />,
      retainSearchParams: ['query']
    }
  ],
  admin: [
    {
      text: "Admin",
      link: "/admin",
      hasSubRoutes: true,
      component: Admin(AdminPage),
        icon: <Badge color="secondary" badgeContent={3}> {/* badge number needes to be coded  */}
                <AdminIcon />
              </Badge>
    },
  ]
};

export const DRAWER_WIDTH = 216;
export const DRAWER_WIDTH_CLOSED = 72;
export const APP_BAR_HEIGHT = 65;
export const STACKING_BAR_HEIGHT = APP_BAR_HEIGHT;
export const BOTTOM_NAV_HEIGHT = 56;

export const Z_INDEX_STACKING_BAR = 100;
export const Z_INDEX_FLOATING_BUTTON = Z_INDEX_STACKING_BAR + 1;

export const PAGE_TRANSITION_TIME = { enter: 300, exit: 200 };
