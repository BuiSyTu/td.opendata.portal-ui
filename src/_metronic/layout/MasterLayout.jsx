import './style.scss'

import { Nav, Navbar } from 'react-bootstrap-v5'
import React, {useEffect, useState} from 'react'
import {checkIsActive, toAbsoluteUrl} from '../helpers'

import Carousel from 'react-multi-carousel'
import {Content} from './components/Content'
import { DefaultTitleCustom } from './components/header/page-title/DefaultTitleCustom'
import {Footer} from './components/Footer'
import {Link} from 'react-router-dom'
import { Menu } from 'antd'
import {MenuComponent} from '../assets/ts/components'
import {PageDataProvider} from './core'
import Particles from "react-tsparticles"
import {ScrollTop} from './components/ScrollTop'
import { categoryApi } from 'src/app/apis/category'
import classnames from 'classnames'
import {useLocation} from 'react-router-dom'

const MasterLayout = ({children}) => {
  const [listCategory, setListCategory] = useState([])

  const location = useLocation()
  const {pathname} = location

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    const fetchData = async() => {
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

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <div id="kt_header" className={classnames('header h-auto flex-column', {
                    'header-fixed-home': checkIsActive(pathname, '/home'),
                  })}  data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
            {/*begin::Container*/}
            <div className="container-xl header-container">
              <div className='header-content-contianer'>
                <div className="w-100 d-flex flex-grow-1 flex-stack">
                  {/*begin::Header Logo*/}
                  <div className="col-auto col-logo">
                    <div className="logo-qh">
                      <Link to="/" className='d-flex align-items-center'>
                        <div className='logo-title'>
                          <img alt="Logo" src={toAbsoluteUrl('/media/logos/logo.png')} className="img-fluid" />
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/*end::Header Logo*/}
                  
                  {/*begin:: Navbar*/}
                  <div className="col header-menu-container d-flex align-items-center justify-content-md-end" id="kt_header_nav">
                    {/*begin::Menu wrapper*/}
                    <Navbar bg='transparent' variant='dark' expand='lg' className='headerNav w-100 p-0'>
                    {/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
                    {/*begin::Menu*/}  
                    <Navbar.Collapse id='basic-navbar-nav' className='show'>
                        <Nav className='me-auto w-100 mw-100'>
                          <Menu onClick={onClickNavbar} selectedKeys={[currentNavbar]} mode="horizontal" className='w-100 mw-100'>
                            <Menu.Item key="home">
                              <Link to='/home' className={classnames('', {active: checkIsActive(pathname, '/home')})}>Trang chủ</Link>
                            </Menu.Item>
                            <Menu.SubMenu key="du-lieu" 
                              title={
                                <Link to='/du-lieu' className={classnames('', {active: checkIsActive(pathname, '/du-lieu'),})}>
                                  Dữ liệu
                                </Link>
                              }
                            >
                              <Menu.Item key="btc-thanhuy">
                                Tổ chức
                              </Menu.Item>
                              <Menu.Item key="vp-thanhuy">
                                Nhóm
                              </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item key="gioi-thieu">
                              <Link to='/gioi-thieu' className={classnames('', {active: checkIsActive(pathname, '/gioi-thieu')})} >Giới thiệu</Link>
                            </Menu.Item>
                            <Menu.Item key="tin-tuc-su-kien">
                              <Link to='/tin-tuc-su-kien' className={classnames('', {active: checkIsActive(pathname, '/tin-tuc-su-kien')})}>Tin tức & Sự kiện</Link>
                            </Menu.Item>
                            <Menu.Item key="lien-he">
                              <Link to='/lien-he' className={classnames('', {active: checkIsActive(pathname, '/lien-he')})}>Liên hệ</Link>
                            </Menu.Item>
                          </Menu>
                        </Nav>
                      </Navbar.Collapse>
                    {/*end::Menu*/}
                    </Navbar>
                    {/*begin::Actions*/}
                    <div className="flex-shrink-0 p-2 p-lg-0 header_nav-right">
                      <div className={classnames('d-flex align-items-stretch px-2 ms-2')}>
                        <Link to={''} className='btn btn-default btn-sm fs-5'>
                          <span className='fa fa-lock fa-fw'></span> <label>Đăng nhập</label>
                        </Link>
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
          {checkIsActive(pathname, '/home') ?
            <div className="main-banner" style={{backgroundImage: `url(${toAbsoluteUrl('media/images/bg-slide.png')})`}}>
              <div className="container">
                <div className="form-search">
                  <div className="form-search-text text-center">
                    {/* <h2 className='text-uppercase text-white'>Cổng dữ liệu mở</h2> */}
                    <p>Cung cấp thông tin, công bố dữ liệu mở qua nền tảng web, tin nhắn SMS, Zalo và API</p>
                    <p>Cho phép cá nhân, tổ chức chia sẻ dữ liệu đến cộng đồng</p>
                  </div>
                  <div className="form-search-input mb-5 mb-md-8">
                    <div className="input-group mb-5">
                      <input type="text" className="form-control" placeholder="Bạn muốn tìm kiếm dữ liệu gì ?" aria-label="Bạn muốn tìm kiếm dữ liệu gì ?" aria-describedby="search-addon2" />
                      <a
                        href='abc'
                        className="btn btn-search input-group-text"
                        id="search-addon2"><span className='fa fa-search'></span></a>
                    </div>
                  </div>
                </div>
                <div className="group-catergory">
                <Carousel
                  additionalTransfrom={0}
                  arrows = {false}
                  autoPlay
                  autoPlaySpeed={6000}
                  centerMode={false}
                  className=""
                  containerclassName="container px-0"
                  dotListclassName=""
                  draggable={false}
                  focusOnSelect={false}
                  infinite
                  itemclassName=""
                  keyBoardControl={false}
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
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
                  }}
                  showDots={true}
                  sliderclassName=""
                  slidesToSlide={1}
                  swipeable
                >
                  {listCategory.map((i, index) => (
                    <div className='item-category text-center' key={index}>
                      <div className="item-category_thumb">
                        <Link to={'/Du-lieu/' + i.slug}>
                          <img src={i.imageUrl
                            ? `https://192.168.2.169:5001/${i.imageUrl}`
                            : ''}
                            alt="" />
                        </Link>
                      </div>
                      <Link to={'/Du-lieu/' + i.slug}>{i.name}</Link>
                    </div>
                    )
                  )}
                </Carousel>
                </div>
              </div>
              <div className="star-parallax">
              
                <Particles
                  id="bannerParticles"
                  // init={particlesInit}
                  // loaded={particlesLoaded}
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
                          default: "bounce"
                        }
                      },
                      size: {
                        value: 3
                      }
                    }
                  }}
                />
                
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
              </div>
            </div>
          : '' }
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

export {MasterLayout}
