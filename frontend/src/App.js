import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Persona from './components/Persona';
import RestSignIn from './components/restaurant/RestSignIn';
import RestSignup from './components/restaurant/RestSignUp';
import UserSignup from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import RestMenu from './components/restaurant/RestMenu';
import RestHome from './components/restaurant/RestHome';
import RestOrders from './components/restaurant/RestOrders';
import UpdateUserDetails from './components/user/UpdateUserDetails';
import UpdateDetails from './components/restaurant/UpdateDetails';
import UserProfile from './components/user/UserProfile';
import RestMainPage from './components/restaurant/RestMainPage';
import AddDishItem from './components/restaurant/AddDishItem';
import UberSignIn from './components/user/UberSignIn';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import FavouritesPage from './components/user/FavouritesPage';
import DishForm from './components/restaurant/DishForm';
import CartModal from './components/CartModal';
import PlaceOrder from './components/user/PlaceOrder';
import NewOrderModal from './components/NewOrderModal';
import OrdersPage from './components/user/OrdersPage';

function App() {
  return (
    <Provider store={store}>
      <ReactNotification />
      <div className='wrapper'>
        <Router>
          <Switch>

            <Route exact component={LandingPage} path={'/'} />
            <Route exact component={UserSignup} path={'/userSignUp'} />
            <Route exact component={UserSignIn} path={'/userSignIn'} />
            <Route exact component={RestSignup} path={'/restSignUp'} />
            <Route exact component={RestSignIn} path={'/restSignIn'} />
            <Route exact component={RestMenu} path={'/restMenu'} />
            <Route exact component={RestHome} path={'/restHome'} />
            <Route exact component={RestOrders} path={'/restOrders'} />
            <Route exact component={Persona} path={'/persona'} />
            <Route exact component={UpdateUserDetails} path={'/updateUserDetails'} />
            <Route exact component={UpdateDetails} path={'/updateDetails'} />
            <Route exact component={UserProfile} path={'/userProfile'} />
            {/* <Route exact component={RestMainPage} path={'/restMain'} /> */}
            <Route exact component={UberSignIn} path={'/uberSignIn'} />
            <Route exact component={FavouritesPage} path={'/favouritesPage'} />
            <Route exact component={RestMainPage} path={'/restMain/:restId'} />
            <Route exact component={AddDishItem} path={'/dishItem/:dishId/add'} />
            <Route exact component={AddDishItem} path={'/dishItem/:dishId/edit'} />
            <Route exact component={CartModal} path={'/cartModal'} />
            <Route exact component={NewOrderModal} path={'/newOrderModal'} />
            <Route exact component={PlaceOrder} path={'/placeOrder'} />
            <Route exact component={OrdersPage} path={'/ordersPage'} />


          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
