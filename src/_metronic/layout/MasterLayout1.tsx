// import * as auth from '../../app/modules/auth/redux/AuthRedux'

import {Modal, Nav, Navbar} from 'react-bootstrap-v5'
import React, {useEffect, useState} from 'react'
import {checkIsActive, toAbsoluteUrl} from '../helpers'
import {shallowEqual, useSelector} from 'react-redux'

import {CONFIG} from '../../helpers/config'
import {CardHighLight} from './components/card/CardHighLight'
import {CardVideo} from './components/card/CardVideo'
import {ChartsWidgetHome} from '../partials/widgets/charts/ChartsWidgetHome'
import {Content} from './components/Content'
import {Footer} from './components/Footer'
import {HeaderUserMenu} from './HeaderUserMenu'
import {LinkAdsRight} from './components/linkimage/LinkAdsRight'
import {LinkImageWrapper} from './components/linkimage/LinkImageWrapper'
import {Login} from './Login'
import {MenuComponent} from '../assets/ts/components'
import {PageDataProvider} from './core'
import {Registration} from './Registration'
import {RootState} from '../../setup'
import {ScrollTop} from './components/ScrollTop'
import {ToolbarAdsTop} from './components/toolbar/ToolbarAdsTop'
import classnames from 'classnames'
import {requestPOST} from '../../helpers/baseAPI'
import {useLocation} from 'react-router-dom'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3'
const toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const MasterLayout: React.FC = ({children}) => {
  const isAuthorized = useSelector<RootState>(({auth}) => auth.accessToken, shallowEqual)
  const location = useLocation()
  const {pathname} = location
  const [phanAnh, setPhanAnh] = useState([])

  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        code: 'tieubieu',
        idLinhVuc: '',
        idChuDe: '',
        soLuong: 5,
        phanTrang: 0,
        sapXep: 'ID',
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachPhanAnh', body)
      let data = res?.data?.phananh ?? []
      setPhanAnh(data)
    }
    try {
      fetchData()
    } catch (error) {}
    return () => {
      setPhanAnh([])
    }
  }, [])

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <div
            className='banner'
            style={{backgroundImage: `url(${toAbsoluteUrl('/media/logos/bg-header.png')})`}}
          >
            <div className='container'>
              <div className='tandan-div-banner'>
                <a href='/home'>
                  <img
                    className='img-fluid'
                    alt=''
                    title=''
                    src={toAbsoluteUrl('/media/logos/banner.png')}
                  />
                </a>
              </div>
            </div>
          </div>
          <Navbar bg='dark' variant='dark' className='headerNav p-0'>
            <div className='container'>
              <Nav className='me-auto'>
                <Nav.Link
                  href='/home'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/home'),
                  })}
                >
                  TRANG CHỦ
                </Nav.Link>
                <Nav.Link
                  href='/gioi-thieu'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/gioi-thieu'),
                  })}
                >
                  GIỚI THIỆU
                </Nav.Link>
                <Nav.Link
                  href='/gui-phan-anh'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/gui-phan-anh'),
                  })}
                >
                  GỬI PHẢN ÁNH
                </Nav.Link>
                <Nav.Link
                  href='/ban-do'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/ban-do'),
                  })}
                >
                  BẢN ĐỒ
                </Nav.Link>
                <Nav.Link
                  href='/phan-anh-moi'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/phan-anh-moi'),
                  })}
                >
                  PHẢN ÁNH MỚI
                </Nav.Link>
                <Nav.Link
                  href='/thong-ke'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/thong-ke'),
                  })}
                >
                  THỐNG KÊ
                </Nav.Link>
                <Nav.Link
                  href='/huong-dan'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/huong-dan'),
                  })}
                >
                  HƯỚNG DẪN
                </Nav.Link>
                {/* <Nav.Link
                  href='/lien-he'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/lien-he'),
                  })}
                >
                  LIÊN HỆ
                </Nav.Link>
                {/* {isAuthorized ? (
                <Nav.Link
                  href='/phan-anh-ca-nhan'
                  className={classnames('', {
                    active: checkIsActive(pathname, '/phan-anh-ca-nhan'),
                  })}

                >
                  PHẢN ÁNH CÁ NHÂN
                </Nav.Link>):<></>} */}
                {isAuthorized ? (
                  <div
                    className={classnames('d-flex align-items-center', toolbarButtonMarginClass)}
                    id='kt_header_user_menu_toggle'
                  >
                    {/* begin::Toggle */}
                    <div
                      className={classnames('cursor-pointer symbol d-flex', toolbarUserAvatarHeightClass)}
                      data-kt-menu-trigger='click'
                      data-kt-menu-attach='parent'
                      data-kt-menu-placement='bottom-end'
                      data-kt-menu-flip='bottom'
                    >
                      <div className='symbol symbol-20px symbol-circle'>
                        <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='metronic' />
                      </div>
                      <div className='d-flex flex-column ms-2'>
                        <div className='d-flex align-items-center fs-5'>
                          {/* {userInfo?.fullName ?? userInfo?.firstName ?? ''} */}
                        </div>
                      </div>
                    </div>
                    <HeaderUserMenu />
                    {/* end::Toggle */}
                  </div>
                ) : (
                  <Nav.Link
                    // href='/dang-nhap'
                    // className={classnames('', {
                    //   active: checkIsActive(pathname, '/dang-nhap'),
                    // })}
                    onClick={() => {
                      setModalLogin(true)
                    }}
                  >
                    ĐĂNG NHẬP
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Navbar>
          <ToolbarAdsTop />
          <div className='wrapper-content py-5'>
            <div className='container content-div'>
              <div className='row portal-content'>
                <div className='col-sm-8 col-md-9' id='content-main'>
                  {/* <Toolbar /> */}
                  {/* <ToolbarHeadSearch /> */}
                  <Content>{children}</Content>
                </div>
                <div className='col-sm-4 col-md-3' id='content-right'>
                  <LinkImageWrapper />
                  <ChartsWidgetHome className='mt-5' hightChat='180px' />
                  <CardHighLight props={phanAnh} />
                  <CardVideo />
                  <LinkAdsRight />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Modal
        show={modalLogin}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setModalLogin(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <Login setModalLogin={setModalLogin} setModalRegister={setModalRegister} />
        </Modal.Body>
      </Modal>
      <Modal
        show={modalRegister}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setModalRegister(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <Registration setModalRegister={setModalRegister} setVisibleSuccess={setVisibleSuccess} />
        </Modal.Body>
      </Modal>
      <Modal
        show={visibleSuccess}
        //size={'lg'}
        scrollable={true}
        onHide={() => {
          setVisibleSuccess(false)
        }}
      >
        <Modal.Body className='w-lg-500px bg-white rounded shadow-sm p-10'>
          <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-15'>
            <h1 className='fw-bolder fs-2qx text-success mb-7'>Đăng ký thành công</h1>
            <div className='fw-bold fs-3 text-muted mb-15'>
              Vui lòng đăng nhập lại để tiếp tục sử dụng.
            </div>
            <div className='text-center'>
              <a
                href='abc'
                className='btn btn-lg btn-primary fw-bolder'
                onClick={() => {
                  setVisibleSuccess(false)
                  setModalLogin(true)
                }}
              >
                Đăng nhập
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
