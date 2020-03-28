import React                   from 'react'
import useBodyClass from 'hooks/useBodyClass';

export default (props) => {
  const { bodyClassname } = props;
  useBodyClass(bodyClassname);

  return (
    <span className={`pte-changing-body-class-${bodyClassname}`}></span>
  )
}