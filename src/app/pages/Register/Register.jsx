import styles from './Register.module.scss'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames/bind'

import * as Yup from 'yup'

import { Modal } from 'react-bootstrap-v5'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

const cx = classNames.bind(styles)

const initialValues = {
    fullName: 'Bùi Sỹ Tú',
    email: 'tubui7121@gmail.com',
    userName: 'tubs',
    phoneNumber: '0914075420',
    password: 'Tandan@123',
    confirmPassword: 'Tandan@123',
}


const regularPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g
const regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/

const registrationSchema = Yup.object().shape({
    fullName: Yup.string().min(3, '').max(100, '').required('Không hợp lệ'),
    phoneNumber: Yup.string()
        .matches(regularPhone, 'Số điện thoại không hợp lệ')
        .min(8, '')
        .max(12, '')
        .required('Không hợp lệ'),
    userName: Yup.string().min(3, '').max(20, '').required('Không hợp lệ'),
    email: Yup.string()
        .email('Định dạng email không phù hợp.')
        .min(3, '')
        .max(50, '')
        .required('Không hợp lệ'),
    password: Yup.string()
        .matches(
            regularExpressionPassword,
            'Mật khẩu từ 6-18 ký tự, phải có: chữ hoa, chữ thường và các ký tự đặc biệt!'
        )
        .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        .max(18, 'Mật khẩu tối đa 18 ký tự')
        .required('Không hợp lệ'),
    confirmPassword: Yup.string()
        .required('Không hợp lệ')
        .when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Mật khẩu không khớp, vui lòng kiểm tra lại!'
            ),
        }),
})

const Register = () => {
    const history = useHistory()
    const [visibleSuccess, setVisibleSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            toast.success('Thao tác thành công!', { autoClose: 2000 })
            // setLoading(true)
            setTimeout(() => {
                console.log(values)
                // register(
                //     values.email,
                //     values.firstname,
                //     values.dateOfBirth,
                //     values.phoneNumber,
                //     values.phoneNumber,
                //     values.password,
                //     values.confirmPassword
                // )
                // .then((response) => {
                //     let res = response.data
                //     if (res.succeeded) {
                //         toast.success('Đăng ký thành công! Vui lòng đăng nhâp lại để tiếp tục!')
                //         setVisibleSuccess(true)
                //     } else {
                //         setStatus(res?.message ?? 'Đăng ký không thành công')
                //     }
                //     setLoading(false)
                //     setSubmitting(false)
                // })
                // .catch(() => {
                //     setLoading(false)
                //     setSubmitting(false)
                //     setStatus('Đăng ký không thành công')
                // })
            }, 1000)
        },
    })

    return (
        <div className={cx('wrapper')} >
            <div className='card p-10 p-lg-15 w-850px '>
                <form
                    className='form w-100'
                    noValidate
                    id='kt_login_signup_form'
                    onSubmit={formik.handleSubmit}
                >
                    {/* begin::Heading */}
                    <div className='mb-10 text-center'>
                        {/* begin::Title */}
                        <h1 className='text-dark mb-3'>Đăng ký tài khoản</h1>
                    </div>
                    {formik.status && (
                        <div className='mb-lg-15 alert alert-danger'>
                            <div className='alert-text font-weight-bold'>{formik.status}</div>
                        </div>
                    )}

                    {/* begin::Form group FullName */}
                    <div className='row'>
                        <div className='col-6'>
                            <div className='fv-row mb-5'>
                                <label className='form-label required fw-bolder text-dark fs-6'>Họ và tên</label>
                                <input
                                    placeholder='Họ và tên'
                                    type='text'
                                    autoComplete='off'
                                    {...formik.getFieldProps('fullName')}
                                    className={classnames(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid': formik.touched.fullName && formik.errors.fullName,
                                        },
                                        {
                                            'is-valid': formik.touched.fullName && !formik.errors.fullName,
                                        }
                                    )}
                                />
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.fullName}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='fv-row mb-5'>
                                <label className='form-label required fw-bolder text-dark fs-6'>Tài khoản</label>
                                <input
                                    placeholder='Tài khoản'
                                    type='text'
                                    autoComplete='off'
                                    {...formik.getFieldProps('userName')}
                                    className={classnames(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid': formik.touched.userName && formik.errors.userName,
                                        },
                                        {
                                            'is-valid': formik.touched.userName && !formik.errors.userName,
                                        }
                                    )}
                                />
                                {formik.touched.userName && formik.errors.userName && (
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.userName}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='fv-row mb-5'>
                        <label className='form-label required fw-bolder text-dark fs-6'>
                            Số điện thoại
                        </label>
                        <input
                            placeholder='Số điện thoại'
                            type='text'
                            autoComplete='off'
                            {...formik.getFieldProps('phoneNumber')}
                            className={classnames(
                                'form-control form-control-lg form-control-solid',
                                { 'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber },
                                {
                                    'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                                }
                            )}
                        />
                        <div className='text-muted mt-2 fs-6'>
                            {/* OTP xác thực sẽ được gửi về số này */}
                        </div>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className='fv-plugins-message-container invalid-feedback'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.phoneNumber}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* begin::Form group Email */}
                    <div className='fv-row mb-5'>
                        <label className='form-label required fw-bolder text-dark fs-6'>Email</label>
                        <input
                            placeholder='Email'
                            type='email'
                            autoComplete='off'
                            {...formik.getFieldProps('email')}
                            className={classnames(
                                'form-control form-control-lg form-control-solid',
                                { 'is-invalid': formik.touched.email && formik.errors.email },
                                {
                                    'is-valid': formik.touched.email && !formik.errors.email,
                                }
                            )}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className='fv-plugins-message-container invalid-feedback'>
                                <div className='fv-help-block'>
                                    <span role='alert'>{formik.errors.email}</span>
                                </div>
                            </div>
                        )}
                        <div className='text-muted mt-2 fs-6'>
                            {/* Dùng trong trường hợp quên mật khẩu, đặt lại mật khẩu, kết nối mạng xã hội */}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='mb-10 fv-row' data-kt-password-meter='true'>
                                <div className='mb-1'>
                                    <label className='form-label required fw-bolder text-dark fs-6'>Mật khẩu</label>
                                    <div className='position-relative mb-3'>
                                        <input
                                            type='password'
                                            placeholder='Mật khẩu'
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
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='fv-row mb-5'>
                                <label className='form-label required fw-bolder text-dark fs-6'>
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type='password'
                                    placeholder='Nhập lại mật khẩu'
                                    autoComplete='off'
                                    {...formik.getFieldProps('confirmPassword')}
                                    className={classnames(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
                                        },
                                        {
                                            'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                                        }
                                    )}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <div className='fv-plugins-message-container invalid-feedback'>
                                        <div className='fv-help-block'>
                                            <span role='alert'>{formik.errors.confirmPassword}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button
                            type='submit'
                            id='kt_sign_up_submit'
                            className='btn btn-lg btn-primary w-100 mb-5'
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {!loading && <span className='indicator-label'>Đăng ký</span>}
                            {loading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Đang xử lý...{' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                        <button
                            type='button'
                            id='kt_login_signup_form_cancel_button'
                            className='btn btn-lg btn-light-info w-100 mb-5'
                            onClick={() => {
                                history.push('/home')
                            }}
                        >
                            Huỷ
                        </button>
                    </div>
                    {/* end::Form group */}
                </form>
            </div>
            <Modal
                show={visibleSuccess}
                scrollable={true}
                onHide={() => {
                    setVisibleSuccess(false)
                }}
            >
                <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
                    <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-15'>
                        <h1 className='fw-bolder fs-2qx text-success mb-7'>Đăng ký thành công</h1>
                        <div className='fw-bold fs-3 text-muted mb-15'>
                            Vui lòng đăng nhập để tiếp tục sử dụng.
                        </div>
                        <div className='text-center'>
                            <a
                                href='/abc'
                                className='btn btn-lg btn-primary fw-bolder'
                                onClick={() => {
                                    setVisibleSuccess(false)
                                    history.push('/home')
                                }}
                            >
                                OK
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default Register
