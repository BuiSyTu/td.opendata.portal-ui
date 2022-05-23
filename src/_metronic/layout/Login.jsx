import * as Yup from 'yup'
import * as auth from '../../app/modules/auth/redux/AuthRedux'

import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import classnames from 'classnames'
import {login} from '../../app/modules/auth/redux/AuthCRUD'
import {useFormik} from 'formik'

const loginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Không hợp lệ'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Không hợp lệ'),
})

const initialValues = {
  userName: '',
  password: '',
}

const Login = (props) => {
  const {setModalLogin, setModalRegister, setModalForgot} = props
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      login(values.userName, values.password)
        .then((data) => {
          let accessToken = data.data.data.token
          setLoading(false)
          dispatch(auth.actions.login(accessToken))
          setModalLogin(false)
          document.location.reload()
        })
        .catch(() => {
          setLoading(false)
          setSubmitting(false)
          setStatus('Tài khoản hoặc mật khẩu không chính xác.')
        })
    },
  })
  return (
    <div className=''>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-dark mb-3'>Đăng nhập hệ thống</h1>
          <div className='text-gray-400 fw-bold fs-4'>
            Bạn chưa có tài khoản?{' '}
            <a
              className='link-primary fw-bolder'
              onClick={() => {
                setModalLogin(false)
                // setModalRegister(true)
                history.push('/dang-ky')
              }}
            >
              Tạo tài khoản mới
            </a>
          </div>
        </div>
        {/* begin::Heading */}

        {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          <div></div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-5'>
          <label className='form-label required fs-4 fw-bolder text-dark'>Tài khoản</label>
          <input
            placeholder='Tên đăng nhập'
            {...formik.getFieldProps('userName')}
            className={classnames(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.userName && formik.errors.userName},
              {
                'is-valid': formik.touched.userName && !formik.errors.userName,
              }
            )}
            name='userName'
            autoComplete='off'
          />
          {formik.touched.userName && formik.errors.userName && (
            <div className='fv-plugins-message-container invalid-feedback'>
              <span role='alert'>{formik.errors.userName}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label required fw-bolder text-dark fs-4 mb-0'>Mật khẩu</label>
            {/* end::Label */}
            {/* begin::Link */}
            <a
              className='link-primary fw-bolder'
              onClick={() => {
                setModalLogin(false)
                setModalForgot(true)
              }}
            >
              Quên mật khẩu ?
            </a>
            {/* end::Link */}
          </div>
          <input
            placeholder='Mật khẩu'
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={classnames(
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
            <div className='fv-plugins-message-container invalid-feedback'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Đăng nhập</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Đang xử lý...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-info w-100 mb-5'
            onClick={() => {
              setModalLogin(false)
            }}
          >
            Huỷ
          </button>
        </div>
        {/* end::Action */}
      </form>
    </div>
  )
}

export {Login}
