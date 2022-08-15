import {Route, Redirect, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../services/reducers/auth";
import {useEffect, useState} from "react";

export function ProtectedRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

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
