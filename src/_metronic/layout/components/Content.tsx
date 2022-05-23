import React, {useEffect} from 'react'
import {useLocation} from 'react-router'
import classnames from 'classnames'
import {DrawerComponent} from '../../assets/ts/components'

const Content: React.FC = ({children}) => {
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div id='kt_content_container' className={classnames('content flex-row-fluid p-0')}>
      {children}
    </div>
  )
}

export {Content}
