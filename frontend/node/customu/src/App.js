import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import { Top } from './Top';
import { DailyTop } from './customu/pages/DailyTop';
import { CategoryView } from './customu/pages/CategoryView';
import {DailyDetail} from './customu/pages/DailyDetail';

export const App = () => {
  return(
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
              <Route exact path='/' component={Top} />
              <Route exact path='/daily' component={DailyTop} />
              <Route exact path='/daily/:id' component={DailyDetail} />
              <Route exact path='/daily/category/:cat' component={CategoryView}/>
              <Route render={() => <h4>not found...</h4>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
