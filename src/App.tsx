import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { ArticlePage } from './layouts/Articles/ArticlePage';
import { SearchArticlesPage } from './layouts/Articles/SearchArticlesPage';
import Login from './layouts/Auth/login.component';
import Profile from './layouts/Auth/profile.component';
import Register from './layouts/Auth/register.component';
import BoardAdmin from './layouts/components/board-admin.component';
import BoardUser from './layouts/components/board-user.component';
import { AddArticle } from './layouts/Articles/AddArticle';
import { Homepage } from './layouts/Homepage/Homepage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      <div className='flex-grow-1'>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <Homepage />
        </Route>
        <Route path='/articles' exact>
          <SearchArticlesPage />
        </Route>
        <Route path='/articles/:id'>
          <ArticlePage/>
        </Route>
        <Route path='/add'>
          <AddArticle/>
        </Route>
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/register' component={Register} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/user' component={BoardUser} />
        <Route path='/admin' component={BoardAdmin} />
      </Switch>
      </div>
      <Footer />
    </div>
  );
}


