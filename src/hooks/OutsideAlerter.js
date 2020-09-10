import React, { useRef, useEffect } from 'react'

function useOutsideAlerter(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [action, ref])
}

function OutsideAlerter({ children, action }) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, action)
  return <div ref={wrapperRef}>{children}</div>
}

export default OutsideAlerter
