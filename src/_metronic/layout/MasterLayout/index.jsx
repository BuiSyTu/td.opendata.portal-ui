import './MasterLayout.scss'

import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Menu } from 'antd'
import { Nav, Navbar } from 'react-bootstrap-v5'
import Particles from 'react-tsparticles'
import Tippy from '@tippyjs/react/headless'
import classnames from 'classnames/bind'

import { checkIsActive, toAbsoluteUrl } from 'src/_metronic/helpers'

import { Content } from 'src/_metronic/layout/components/Content'
import { DefaultTitleCustom } from 'src/_metronic/layout/components/header/page-title/DefaultTitleCustom'
import { MenuComponent } from 'src/_metronic/assets/ts/components'
import { PageDataProvider } from 'src/_metronic/layout/core'
import { ScrollTop } from 'src/_metronic/layout/components/ScrollTop'
import { categoryApi } from 'src/app/apis'
import { setCategoryId } from 'src/setup/redux/dataset/Slice'
import { Wrapper as PopperWrapper } from 'src/components/Popper'
import AccountItem from 'src/components/AccountItem'
import { Footer } from './Footer'

const MasterLayout = ({ children }) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.global.accessToken)
  const userProfile = useSelector(state => state.global.userProfile)

  const [listCategory, setListCategory] = useState([])
  const [inputValue, setInputValue] = useState('')

  const location = useLocation()
  const { pathname } = location


  const responseCarousel = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 7,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 4,
      partialVisibilityGutter: 30
    }
  }

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await categoryApi.getAll()
      setListCategory(res?.data ?? [])
    }

    fetchData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  const [currentNavbar, setCurrentNavbar] = useState(1)
  const onClickNavbar = (e) => {
    setCurrentNavbar(e.key)
  }

  const handleClickCategory = (value) => {
    dispatch(setCategoryId(value))
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
                            selectedKeys={[currentNavbar]}
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
                                <div className="dd-info" tabIndex="-1" {...attrs}>
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
          {/*end::Header*/}
          {/* begin:: Banner */}
          {checkIsActive(pathname, '/home') ?
            <div className='main-banner' style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-slide.png')})` }}>
              <div className='container'>
                <div className='form-search'>
                  <div className='form-search-text text-center'>
                    {/* <h2 className='text-uppercase text-white'>Cổng dữ liệu mở</h2> */}
                    <p>Cung cấp thông tin, công bố dữ liệu mở qua nền tảng web, tin nhắn SMS, Zalo và API</p>
                    <p>Cho phép cá nhân, tổ chức chia sẻ dữ liệu đến cộng đồng</p>
                  </div>
                  <div className='form-search-input mb-5 mb-md-8'>
                    <div className='input-group mb-5'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Bạn muốn tìm kiếm dữ liệu gì ?'
                        aria-label='Bạn muốn tìm kiếm dữ liệu gì ?'
                        aria-describedby='search-addon2'
                        onChange={(event) => { setInputValue(event?.target?.value ?? '') }}
                      />
                      <Link
                        to={`/du-lieu?search=${inputValue}`}
                        className='btn btn-search input-group-text'
                        id='search-addon2'>
                        <span className='fa fa-search'></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='group-catergory'>
                  <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlay
                    autoPlaySpeed={6000}
                    centerMode={false}
                    containerclassName='container px-0'
                    dotListclassName=''
                    draggable={false}
                    focusOnSelect={false}
                    infinite
                    itemclassName=''
                    keyBoardControl={false}
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responseCarousel}
                    showDots={true}
                    sliderclassName=''
                    slidesToSlide={1}
                    swipeable
                  >
                    {listCategory.map((i) => (
                      <div
                        className='item-category text-center'
                        key={i.id}
                        onClick={() => handleClickCategory(i.id)}
                        title={i?.name ?? ''}
                      >
                        <div className='item-category_thumb'>
                          <Link to={`/Du-lieu/${i.id}`} key={`link-${i.id}`}>
                            <img src={i.imageUrl
                              ? `${process.env.REACT_APP_FILE_URL}/${i.imageUrl}`
                              : ''}
                              alt='' />
                          </Link>
                        </div>
                      </div>
                    )
                    )}
                  </Carousel>
                </div>
              </div>
              <div className='star-parallax'>

                <Particles
                  id='bannerParticles'
                  options={{
                    fpsLimit: 60,
                    particles: {
                      links: {
                        enable: true,
                        distance: 100
                      },
                      move: {
                        enable: true,
                        speed: 2,
                        outModes: {
                          default: 'bounce'
                        }
                      },
                      size: {
                        value: 3
                      }
                    }
                  }}
                />

                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
              </div>
            </div>
            : ''}
          {/* end:: Banner */}
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
    </PageDataProvider>
  )
}

export default MasterLayout