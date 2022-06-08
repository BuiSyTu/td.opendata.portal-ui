import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, Switch } from 'react-router-dom'
import { logOut } from 'src/setup/redux/global/Slice'

export default function Logout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logOut())
    }, [dispatch])

    return (
        <Switch>
            <Redirect to='/dang-nhap' />
        </Switch>
    )
}
