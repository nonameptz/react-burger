import feedStyles from './feed.module.css';
import {FC} from "react";
import FeedDetails from "../components/feed-details/feed-details";
type TFeedProps = {
  isPrivate: boolean;
};
export const FeedPage:FC<TFeedProps> = ({isPrivate}) => {
  return (
    <div className={`d-flex ${feedStyles.ingredientStandalone}`}>
      <FeedDetails isPrivate={isPrivate} />
    </div>
  );
}
