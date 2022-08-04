import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";

export function VisitorRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      render={() =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect
            to='/'
          />
        )
      }
    />
  );
}
