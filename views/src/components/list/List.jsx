import './list.scss';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import ListItem from '../listitem/ListItem';
import { useRef, useState } from 'react';

const List = ({ list }) => {
  const [slightNumber, setSlightNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const listRef = useRef()

  const handleClick = (direction) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slightNumber > 0) {
      setSlightNumber(slightNumber - 1)
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    }
    if (direction === 'right' && slightNumber < 5) {
      setSlightNumber(slightNumber + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  }

  return (
    <div className='list'>
      <span className="listTitle">
        {list.title}
      </span>
      <div className="wrapper">
        <ArrowBackIos className='sliderArrow left' style={{ display: !isMoved && "none" }} onClick={() => handleClick('left')} />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem key={i} index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIos className='sliderArrow right' onClick={() => handleClick('right')} />
      </div>
    </div>
  )
}

export default List