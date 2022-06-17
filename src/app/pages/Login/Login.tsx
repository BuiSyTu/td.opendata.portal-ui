import styles from './Login.module.scss'

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import classNames from 'classnames/bind'

import { useFormik } from 'formik'
import { setAccessToken, setUserProfile } from 'src/setup/redux/global/Slice'
import { citizenApi } from 'src/app/apis'

const cx = classNames.bind(styles)

const loginSchema = Yup.object().shape({
    userName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    userName: '',
    password: '',
}

const Login = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            const getToken = async () => {
                const { userName, password } = values
                const data = await citizenApi.getToken(userName, password)

                if (!data) return null

                const accessToken = data?.token
                dispatch(setAccessToken(accessToken))
                return accessToken
            }

            const getPersonalProfile = async () => {
                setLoading(true)

                const accessToken = await getToken()
                if (!accessToken) {
                    setStatus('Đăng nhập không thành công')
                    setSubmitting(false)
                    setLoading(false)
                    return
                }

                const userProfile = await citizenApi.getPersonalProfile(accessToken)
                if (!!userProfile) {
                    dispatch(setUserProfile(userProfile))
                    history.push('/home')
                } else {
                    setStatus('Đăng nhập không thành công')
                }

                setSubmitting(false)
                setLoading(false)
            }

            getPersonalProfile()
        },
    })

    return (
        <div className='w-600px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
            <form
                className='form w-100'
                onSubmit={formik.handleSubmit}
                noValidate
                id='kt_login_signin_form'
            >
                <div className='text-center mb-10'>
                    <h1 className='text-dark mb-3'>Đăng nhập hệ thống</h1>
                    <div className='text-gray-400 fw-bold fs-4'>
                        Bạn chưa có tài khoản?{' '}
                        <Link to='/dang-ky' className='link-primary fw-bolder'>
                            Tạo tài khoản mới
                        </Link>
                    </div>
                </div>

                {formik.status ? (
                    <div className='mb-lg-15 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                    </div>
                ) : (
                    <></>
                )}

                <div className='fv-row mb-10'>
                    <label className='form-label fs-5 fw-bolder text-dark'>Tài khoản</label>
                    <input
                        placeholder='Tên đăng nhập'
                        {...formik.getFieldProps('userName')}
                        className={cx(
                            'form-control form-control-lg form-control-solid',
                            { 'is-invalid': formik.touched.userName && formik.errors.userName },
                            {
                                'is-valid': formik.touched.userName && !formik.errors.userName,
                            }
                        )}
                        name='userName'
                        autoComplete='off'
                    />
                    {formik.touched.userName && formik.errors.userName && (
                        <div className='fv-plugins-message-container'>
                            <span role='alert'>{formik.errors.userName}</span>
                        </div>
                    )}
                </div>

                <div className='fv-row mb-10'>
                    <div className='d-flex justify-content-between mt-n5'>
                        <div className='d-flex flex-stack mb-2'>
                            <label className='form-label fw-bolder text-dark fs-5 mb-0'>Mật khẩu</label>
                            <Link
                                to='/quen-mat-khau'
                                className='link-primary fs-5 fw-bolder'
                                style={{ marginLeft: '5px' }}
                            >
                                Quên mật khẩu ?
                            </Link>
                        </div>
                    </div>
                    <input
                        placeholder='Mật khẩu'
                        type='password'
                        autoComplete='off'
                        {...formik.getFieldProps('password')}
                        className={cx(
                            'form-control form-control-lg form-control-solid',
                            {
                                'is-invalid': formik.touched.password && formik.errors.password,
                            },
                            {
                                'is-valid': formik.touched.password && !formik.errors.password,
                            }
                        )}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.password}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {!loading && <span className='indicator-label'>Đăng nhập</span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Đang xử lý...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}


export default Login
