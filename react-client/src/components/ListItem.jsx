import React from 'react';

const ListItem = (props) => (
  <div>
     <tr>
      <td> { props.item.first_name }</td>
      <td> { props.item.last_name }</td>
      <td> { props.item.cohort }</td>
    </tr>
  </div>
)

export default ListItem;