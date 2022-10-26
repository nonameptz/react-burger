import {Route, Redirect, useLocation, RouteProps} from 'react-router-dom';
import {useDispatch, useSelector} from '../../types/dispatch'
import {getUser} from "../../services/reducers/auth";
import {FC, useEffect, useState} from "react";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute:FC<IProtectedRouteProps & RouteProps> = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector(store => store.auth);
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    await dispatch(getUser())
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: pathname } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
