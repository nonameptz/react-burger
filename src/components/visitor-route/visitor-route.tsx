import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import {FC} from "react";
import {IRootStore} from '../../types/store';

interface IVisitorRouteProps {
  path: string | string[];
  exact: boolean;
  children: React.ReactNode;
}

const VisitorRoute: FC<IVisitorRouteProps> = ({ children, ...rest }) => {
  const isLoggedIn = useSelector<IRootStore, boolean>(store => store.auth.isLoggedIn);

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
