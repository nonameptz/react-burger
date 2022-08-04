import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const {pathname} = useLocation();

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
