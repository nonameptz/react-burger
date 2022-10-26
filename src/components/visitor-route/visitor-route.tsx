import { Route, Redirect } from 'react-router-dom';
import {useSelector} from '../../types/dispatch';
import {FC} from "react";

interface IVisitorRouteProps {
  path: string | string[];
  exact: boolean;
  children: React.ReactNode;
}

const VisitorRoute: FC<IVisitorRouteProps> = ({ children, ...rest }) => {
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
export default VisitorRoute;
