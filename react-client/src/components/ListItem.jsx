import React from 'react';

const ListItem = (props) => (
  <div>
   <ul> 
    <li> { props.item.name }</li>
   </ul>
  </div>
)

export default ListItem;