import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div id='studentNumber'>
   <br /> 
   { typeof props.items === 'string' ? "There is 1 student." : "There are " + props.items.length + " students." } 
    <div><br />
    </div>
      <tr>
      <th> First Name</th>
      <th> Last Name</th>
      <th> Cohort </th>
    </tr>
    { typeof props.items === 'string' ? props.items : props.items.map( (item, key) => <ListItem item={item} key={key}/>)}
  </div>
)

export default List;


