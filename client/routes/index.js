import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App.jsx';
import HomePage from '../components/home/HomePage.jsx';
import SignupPage from '../components/authentication/SignupPage.jsx';
import DashboardPage from '../components/dashboard/Dashboard.jsx';
import requireAuth from '../utils/requireAuth.jsx';
import requireAdminAuth from '../utils/requireAdminAuth.jsx';
import DocumentPage from '../components/document/DocumentPage.jsx';
import ManangeRolePage from '../components/admin/ManageRolePage.jsx';
import ManageUserPage from '../components/admin/ManageUsersPage.jsx';
import NotFound from '../components/PageNotFound/NotFound.jsx';
import ProfilePage from '../components/profile/ProfilePage.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuth(DashboardPage)} />
    <Route path="login" component={HomePage} />
    <Route path="signup" component={SignupPage} />
    <Route path="document" component={requireAuth(DocumentPage)} />
    <Route path="profile" component={requireAuth(ProfilePage)} />
    <Route path="admin/manageroles"
      component={requireAdminAuth(ManangeRolePage)} />
    <Route path="admin/manageusers"
        component={requireAdminAuth(ManageUserPage)} />
      <Route path="*" component={NotFound} />
  </Route>
);
