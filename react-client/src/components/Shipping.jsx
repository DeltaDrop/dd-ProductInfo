import React from 'react';
import TimeLeft from './styled-components/TimeLeft.jsx';
import UnitsSold from './styled-components/UnitsSold.jsx';
import ShippingType from './styled-components/ShippingType.jsx';

const Shipping = ({shipping, time}) => {

  const checkTime = (time) => {
    if (time < 0) return <TimeLeft style={{color:"rgb(255, 114, 118)"}}>Drop has Closed</TimeLeft>
    if (time.days > 0) return <TimeLeft style={{color:"rgb(132, 148, 147)"}}>{time.days + ':' + time.hours + ':' + time.minutes + ':' + time.seconds}</TimeLeft>
    else return <TimeLeft style={{color:"rgb(255, 114, 118)"}}>{time.days + ':' + time.hours + ':' + time.minutes + ':' + time.seconds}</TimeLeft>
  }

  return(
    <div>
      {time ? checkTime(time) : ''} 
      <UnitsSold>{`${shipping.units_sold} sold `}</UnitsSold> 
      <ShippingType>{shipping.shipping_option}</ShippingType>
    </div>
  )
}

export default Shipping;