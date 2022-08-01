import { Route, Redirect } from 'react-router-dom';
import {getCookie} from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const token = getCookie('accessToken');

  return (
    <Route
      {...rest}
      render={() =>
        token ? (
          children
        ) : (
          <Redirect
            to='/login'
          />
        )
      }
    />
  );
}
