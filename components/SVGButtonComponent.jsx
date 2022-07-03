
const SVGButtonComponent = ({children, btnStyle, extraStyle = '', iconStyle = 'h-4 w-4', after, spanStyle}) => {
  return (
    <button className={btnStyle ? btnStyle : 'h-9 w-9 rounded-full flex items-center justify-center ' + extraStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={iconStyle} viewBox="0 0 16 16">
            {children}
        </svg>
        {after && <span className={spanStyle}>{after}</span>}
    </button>
  )
}

export default SVGButtonComponent