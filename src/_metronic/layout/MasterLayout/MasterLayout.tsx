import './MasterLayout.scss'

import Tippy from '@tippyjs/react/headless'
import { Menu } from 'antd'
import classnames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap-v5'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { checkIsActive, toAbsoluteUrl } from 'src/_metronic/helpers'

import AccountItem from 'src/components/AccountItem'
import { Wrapper as PopperWrapper } from 'src/components/Popper'
import { RootState } from 'src/setup'
import { MenuComponent } from 'src/_metronic/assets/ts/components'
import { Content } from 'src/_metronic/layout/components/Content'
import { DefaultTitleCustom } from 'src/_metronic/layout/components/header/page-title/DefaultTitleCustom'
import { ScrollTop } from 'src/_metronic/layout/components/ScrollTop'
import { PageDataProvider } from 'src/_metronic/layout/core'
import Banner from './Banner'
import { Footer } from './Footer'

interface MasterLayoutProps {
  children?: any,
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.global.accessToken)
  const userProfile: any = useSelector((state: RootState) => state.global.userProfile)

  const location = useLocation()
  const { pathname } = location

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

  const [currentNavbar, setCurrentNavbar] = useState(1)

  const onClickNavbar = (e: any) => {
    setCurrentNavbar(e.key)
  }

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <div
            id='kt_header'
            className={classnames('header h-auto flex-column', {
              'header-fixed-home': checkIsActive(pathname, '/home'),
            })}
            data-kt-sticky='true'
            data-kt-sticky-name='header'
            data-kt-sticky-offset='{default: "200px", lg: "300px"}'
          >
            {/*begin::Container*/}
            <div className='container-xl header-container'>
              <div className='header-content-contianer'>
                <div className='w-100 d-flex flex-grow-1 flex-stack'>
                  {/*begin::Header Logo*/}
                  <div className='col-auto col-logo'>
                    <div className='logo-qh'>
                      <Link to='/' className='d-flex align-items-center'>
                        <div className='logo-title'>
                          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.png')} className='img-fluid' />
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/*end::Header Logo*/}

                  {/*begin:: Navbar*/}
                  <div className='col header-menu-container d-flex align-items-center justify-content-md-end' id='kt_header_nav'>
                    {/*begin::Menu wrapper*/}
                    <Navbar bg='transparent' variant='dark' expand='lg' className='headerNav w-100 p-0'>
                      {/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
                      {/*begin::Menu*/}
                      <Navbar.Collapse id='basic-navbar-nav' className='show'>
                        <Nav className='me-auto w-100 mw-100'>
                          <Menu
                            onClick={onClickNavbar}
                            selectedKeys={[currentNavbar.toString()]}
                            mode='horizontal'
                            className='w-100 mw-100'
                          >
                            <Menu.Item key='home'>
                              <Link
                                to='/home'
                                className={classnames('', { active: checkIsActive(pathname, '/home') })} >
                                Trang chủ
                              </Link>
                            </Menu.Item>
                            <Menu.Item key='du-lieu'>
                              <Link
                                to='/du-lieu'
                                className={classnames('', { active: checkIsActive(pathname, '/du-lieu'), })} >
                                Dữ liệu
                              </Link>
                            </Menu.Item>
                            <Menu.Item key='gioi-thieu'>
                              <Link
                                to='/gioi-thieu'
                                className={classnames('', { active: checkIsActive(pathname, '/gioi-thieu') })} >
                                Giới thiệu
                              </Link>
                            </Menu.Item>
                            <Menu.Item key='tin-tuc-su-kien'>
                              <Link
                                to='/tin-tuc-su-kien'
                                className={classnames('', { active: checkIsActive(pathname, '/tin-tuc-su-kien') })} >
                                Tin tức & Sự kiện
                              </Link>
                            </Menu.Item>
                            <Menu.Item key='lien-he'>
                              <Link
                                to='/lien-he'
                                className={classnames('', { active: checkIsActive(pathname, '/lien-he') })} >
                                Liên hệ
                              </Link>
                            </Menu.Item>
                          </Menu>
                        </Nav>
                      </Navbar.Collapse>
                      {/*end::Menu*/}
                    </Navbar>
                    {/*begin::Actions*/}
                    <div className='flex-shrink-0 p-2 p-lg-0 header_nav-right'>
                      <div className={classnames('d-flex align-items-stretch px-2 ms-2')}>
                        {
                          !!accessToken ? (
                            <Tippy
                              interactive
                              // visible
                              render={attrs => (
                                <div className="dd-info" tabIndex={-1} {...attrs}>
                                  <PopperWrapper>
                                    <AccountItem
                                      icon='fa fas fa-align-left'
                                      content='Thông tin tài khoản'
                                      to='/tai-khoan'
                                    />
                                    <AccountItem
                                      icon='fa fas fa-history'
                                      content='Quản lý dịch vụ'
                                      borderTop
                                      to='/quan-ly-dich-vu'
                                    />
                                    <AccountItem
                                      icon='fa fas fa-sign-out-alt'
                                      content='Đăng xuất'
                                      borderTop
                                      to='/dang-xuat'
                                    />
                                  </PopperWrapper>
                                </div>
                              )}
                              placement="bottom-end"
                              delay={[0, 50]}
                              hideOnClick={false}
                            >
                              <div className='avatar'>
                                <img
                                  src='/media/logos/user.png'
                                  alt='' />
                                <label className='menu-text'>{userProfile?.fullName}</label>
                                <i className="fa fas fa-angle-down"></i>
                              </div>
                            </Tippy>
                          ) : (
                            <Link to='/dang-nhap' className='btn btn-default btn-sm fs-5'>
                              <span className='fa fa-lock fa-fw'></span> <label>Đăng nhập</label>
                            </Link>
                          )
                        }

                      </div>
                    </div>
                    {/*end::Actions*/}
                    {/*end::Menu wrapper*/}
                  </div>
                  {/*end:: Navbar*/}
                </div>
              </div>
              {/*end::Container*/}
            </div>
            {/*end::Container*/}
          </div>

          {checkIsActive(pathname, '/home') ? (
            <Banner />
          ) : (
            <></>
          )}

          <div className={classnames('wrapper-content', {
            'py-0': checkIsActive(pathname, '/home'),
          })}>

            {checkIsActive(pathname, '/home') ?
              <div className='col-12 content-div'>
                <div className='row mx-0 portal-content'>
                  <Content>{children}</Content>
                </div>
              </div>
              :
              <div className='container content-div'>
                <div className='portal-content'>
                  <div className='page-breadscrumb pb-3 fs-5'>
                    <DefaultTitleCustom />
                  </div>
                  <Content>{children}</Content>
                </div>
              </div>
            }

          </div>
          <Footer />
        </div>
      </div>

      <ScrollTop />
    </PageDataProvider >
  )
}

export default MasterLayout
