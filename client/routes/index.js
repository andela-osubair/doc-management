import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/home/HomePage';
import SignupPage from '../components/authentication/SignupPage';
import DashboardPage from '../components/dashboard/Dashboard';
import requireAuth from '../utils/requireAuth';
import requireAdminAuth from '../utils/requireAdminAuth';
import DocumentPage from '../components/document/DocumentPage';
import ManangeRolePage from '../components/admin/ManageRolePage';
import ManageUserPage from '../components/admin/ManageUsersPage';
import NotFound from '../components/PageNotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuth(DashboardPage)} />
    <Route path="login" component={HomePage} />
    <Route path="signup" component={SignupPage} />
    <Route path="document" component={requireAuth(DocumentPage)} />
    <Route path="admin/manageroles"
      component={requireAdminAuth(ManangeRolePage)} />
    <Route path="admin/manageusers"
        component={requireAdminAuth(ManageUserPage)} />
      <Route path="*" component={NotFound} />
  </Route>
);
