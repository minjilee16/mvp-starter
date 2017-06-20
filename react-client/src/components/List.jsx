import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
   <br /> 

   { typeof props.items === 'string' ? "There is 1 student." : "There are " + props.items.length + " students." } 
    <div><br />
    <h2>Name</h2>
    </div>
    { typeof props.items === 'string' ? props.items : props.items.map( (item, key) => <ListItem item={item} key={key}/>)}
  </div>
)

export default List;


