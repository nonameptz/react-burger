import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import {FC, useRef} from "react";
import { useDispatch } from "react-redux";
import { sortConstructorElements } from '../../services/reducers/burger';
import {IIngredient} from "../../types/store";

interface ISortableConstructorElement {
  index: number;
  element: IIngredient;
  onDelete: () => void;
}

interface DragItem {
  index: number
  id: string
  type: string
}

const SortableConstructorElement:FC<ISortableConstructorElement> = ({index, element, onDelete}) => {
  const dragDropSortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop<
    DragItem,
    void
  >({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item:DragItem, monitor) {
      if (!dragDropSortRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dragDropSortRef.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()!
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      dispatch(sortConstructorElements({from: dragIndex, to: hoverIndex}));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'sort',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(dragDropSortRef));

  return (
    <div className={`flex pl-2 ${burgerConstructorStyles.constructorElement}`}
         style={{ opacity }}
         ref={dragDropSortRef}
         data-handler-id={index}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        handleClose={onDelete}
      />
    </div>
  )
}

export default SortableConstructorElement;
