import React, {forwardRef} from 'react'

const CustomDatetimePicker = forwardRef((props, ref) => {
  //https://github.com/Hacker0x01/react-datepicker/blob/master/docs-site/src/examples/custom_input.jsx
  return (
    <button ref={ref} type="button" className="btn waves-effect waves-light" onClick={props.onClick}>
      {props.value}
    </button>
  )
})

export default CustomDatetimePicker
