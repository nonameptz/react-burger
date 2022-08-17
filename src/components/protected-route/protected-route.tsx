import {Route, Redirect, useLocation, RouteProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/reducers/auth";
import {FC, useEffect, useState} from "react";
import {IRootStore} from "../../types/store";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute:FC<IProtectedRouteProps & RouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = useSelector<IRootStore, boolean>(store => store.auth.isLoggedIn);
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    // @ts-ignore
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
