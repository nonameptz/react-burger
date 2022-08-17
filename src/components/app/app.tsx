import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory, useLocation
} from "react-router-dom";
import {
  ConstructorPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  LoginPage,
  NotFound404,
  ProfilePage,
  IngredientPage
} from "../../pages";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import VisitorRoute from '../visitor-route/visitor-route';
import IngredientsDetails from '../ingredient-details/ingredient-details'
import {fetchBurgers, unselectIngredient} from '../../services/reducers/burger';
import Modal from '../modal/modal';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {Location} from "history";

export interface ILocation {
  from: Location;
  background?: Location;
  pathname: string;
}

function ModalSwitch() {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const history = useHistory();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    dispatch(unselectIngredient())
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <ConstructorPage />
        </Route>
        <VisitorRoute path="/login" exact={true}>
          <LoginPage />
        </VisitorRoute>
        <VisitorRoute path="/register" exact={true}>
          <RegisterPage />
        </VisitorRoute>
        <VisitorRoute path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </VisitorRoute>
        <VisitorRoute path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </VisitorRoute>
        <ProtectedRoute path={["/profile","/profile/orders"]} exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route
          path='/ingredients/:id'
          children={
            <Modal header='Детали ингредиента' onClose={handleModalClose}>
              <IngredientsDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchBurgers());
  }, []);
  return (
    <div className={appStyles.app}>
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
