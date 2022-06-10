import styles from './Account.module.scss'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames/bind'

import { setUserProfile } from 'src/setup/redux/global/Slice'
import { citizenApi } from 'src/app/apis'

const cx = classNames.bind(styles)

const regularPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g

const accountSchema = Yup.object().shape({
    fullName: Yup.string().min(3, '').max(100, '').required('Không hợp lệ'),
    address: Yup.string().max(200, ''),
    phoneNumber: Yup.string()
        .matches(regularPhone, 'Số điện thoại không hợp lệ')
        .min(8, '')
        .max(12, '')
        .required('Không hợp lệ'),
    email: Yup.string()
        .email('Định dạng email không phù hợp')
        .min(6, 'Minimum 6 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
})

const Account = () => {
    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.global.userProfile)
    const accessToken = useSelector(state => state.global.accessToken)

    const [loading, setLoading] = useState(false)

    const initialValues = {
        fullName: userProfile?.fullName ?? '',
        address: userProfile?.address ?? '',
        phoneNumber: userProfile?.phoneNumber ?? '',
        email: userProfile?.email ?? '',
    }

    const formik = useFormik({
        initialValues,
        validationSchema: accountSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            const updateUserProfile = async () => {
                setLoading(true)

                const newUserProfile = Object.assign({ ...userProfile }, values)
                const status = await citizenApi.updatePersonalProfile(newUserProfile, accessToken)

                if (status) {
                    dispatch(setUserProfile(newUserProfile))
                } else {
                    setStatus('Cập nhật thành công')
                }

                setSubmitting(false)
                setLoading(false)
            }

            updateUserProfile()
        },
    })

    return (
        <div className={cx('wrapper')}>
            <div className={cx('card p-10 p-lg-15 w-750px')}>
                <form
                    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <div className='mb-10 text-center'>
                        <h1 className='text-dark mb3'>Thông tin tài khoản</h1>
                    </div>

                    {/* begin::Form group */}
                    <div className='fv-row mb-10 d-flex justify-content-between align-items-center'>
                        <label className='form-label fs-5 fw-bolder text-dark'>Họ tên</label>
                        <input
                            placeholder='Họ và tên'
                            {...formik.getFieldProps('fullName')}
                            className={cx(
                                'form-control form-control-lg form-control-solid w-500px',
                                { 'is-invalid': formik.touched.fullName && formik.errors.fullName },
                                {
                                    'is-valid': formik.touched.fullName && !formik.errors.fullName,
                                }
                            )}
                            name='fullName'
                            autoComplete='off'
                        />

                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-10 d-flex justify-content-between align-items-center'>
                        <label className='form-label fs-5 fw-bolder text-dark'>Địa chỉ</label>
                        <input
                            {...formik.getFieldProps('address')}
                            placeholder='Nhập địa chỉ (số nhà, tổ, thôn, xóm)'
                            className={cx(
                                'form-control form-control-lg form-control-solid w-500px',
                                { 'is-invalid': formik.touched.address && formik.errors.address },
                                {
                                    'is-valid': formik.touched.address && !formik.errors.address,
                                }
                            )}
                            name='address'
                            autoComplete='off'
                        />

                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-10 d-flex justify-content-between align-items-center'>
                        <label className='form-label fs-5 fw-bolder text-dark'>Số điện thoại</label>
                        <input
                            {...formik.getFieldProps('phoneNumber')}
                            placeholder='Số điện thoại'
                            className={cx(
                                'form-control form-control-lg form-control-solid w-500px',
                                { 'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber },
                                {
                                    'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                                }
                            )}
                            name='phoneNumber'
                            autoComplete='off'
                        />

                    </div>
                    {/* end::Form group */}

                    {/* begin::Form group */}
                    <div className='fv-row mb-10 d-flex justify-content-between align-items-center'>
                        <label className='form-label fs-5 fw-bolder text-dark'>Email</label>
                        <input
                            {...formik.getFieldProps('email')}
                            placeholder='Nhập email'
                            className={cx(
                                'form-control form-control-lg form-control-solid w-500px',
                                { 'is-invalid': formik.touched.email && formik.errors.email },
                                {
                                    'is-valid': formik.touched.email && !formik.errors.email,
                                }
                            )}
                            name='email'
                            autoComplete='off'
                        />

                    </div>
                    {/* end::Form group */}

                    <button
                        type='submit'
                        className={cx('btn btn-lg btn-primary w-100 mb-5')}
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {!loading && <span className='indicator-label'>Cập nhật</span>}
                        {loading && (
                            <span className='indicator-progress d-block'>
                                Đang xử lý...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div >

    )
}

export default Account

