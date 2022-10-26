import feedStyles from './feed.module.css';
import {FC, useEffect} from "react";
import FeedDetails from "../components/feed-details/feed-details";
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_ALL_CONNECTION_CLOSED,
  WS_ORDERS_ALL_CONNECTION_START
} from "../types/actionTypes";
import {useDispatch} from "../types/dispatch";
import {getCleanCookie} from "../utils/cookie";
type TFeedProps = {
  isPrivate: boolean;
};
export const FeedPage:FC<TFeedProps> = ({isPrivate}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPrivate) {
      const payload = `?token=${getCleanCookie('accessToken')}`;
      dispatch({ type: WS_ORDERS_CONNECTION_START, payload });
    } else {
      dispatch({ type: WS_ORDERS_ALL_CONNECTION_START });
    }
    return () => {
      dispatch({ type: isPrivate ? WS_ORDERS_CONNECTION_CLOSED : WS_ORDERS_ALL_CONNECTION_CLOSED });
    }
  }, []);
  return (
    <div className={`d-flex ${feedStyles.ingredientStandalone}`}>
      <FeedDetails isPrivate={isPrivate} />
    </div>
  );
}
