import { FC, useEffect } from 'react'
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux'
import { citizenApi } from 'src/app/apis'
import { setUserProfile } from 'src/setup/redux/global/Slice'
import { RootState } from '../../../../setup'
import * as auth from './AuthRedux'

const mapState = (state: RootState) => ({ auth: state.auth })
const connector = connect(mapState, auth.actions)
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state: RootState) => state.global.accessToken)

  useEffect(() => {
    if (accessToken) {
      citizenApi.getPersonalProfile(accessToken)
        .then(userProfile => {
          dispatch(setUserProfile(userProfile))
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{props.children}</>
}

export default connector(AuthInit)
