import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './components/Home/Home'
import QuickReview from './components/quick-reviw/quick-review'
import NewWords from './components/new-words/new-words'
import Review from './components/quick-reviw/review'
import Edit from './components/quick-reviw/edit'
import Statistic from './components/statistic/statistic'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Home} title = "Home" initial = {true} />
         <Scene key = "quickReviw" component = {QuickReview} title = "Quick reviw" initial = {false}/>
         <Scene key = "newWords" component = {NewWords} title = "New Word" initial = {false}/>
         <Scene key = "review" component = {Review} title = "Review" initial = {false}/>
         <Scene key = "edit" component = {Edit} title = "Edit" initial = {false}/>
         <Scene key = "statistic" component = {Statistic} title = "Statistic" initial = {false}/>
      </Scene>
   </Router>
)
export default Routes