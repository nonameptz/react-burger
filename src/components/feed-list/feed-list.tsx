import feedListStyles from "./feed-list.module.css";
import {FC} from "react";
import {TOrderPreview} from "../../types/store";
import OrderPreview from "../order-preview/order-preview";

interface IFeedListProps {
  urlPrefix: string
  orderList: Array<TOrderPreview>
}
const FeedList:FC<IFeedListProps> = ({urlPrefix, orderList}) => {
  return (
    <div className={`${feedListStyles.orders} flex`}>
      <div className={`${feedListStyles.ordersList} scroll`}>
        {orderList.map((order, key) => (
          <OrderPreview key={key} order={order} urlPrefix={urlPrefix} />
        ))}
      </div>
    </div>
  )
}

export default FeedList;
