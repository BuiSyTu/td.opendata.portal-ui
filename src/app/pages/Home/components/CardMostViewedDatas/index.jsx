import React, { useEffect, useState } from 'react'

import classNames from 'classnames/bind';
import styles from './CardMostViewedDatas.module.scss'

import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom';
import { datasetApi } from 'src/app/apis'
import { getCurrentDate } from 'src/utils/common';
import { toAbsoluteUrl } from 'src/_metronic/helpers'

const cx = classNames.bind(styles)

const CardMostViewedDatas = () => {
  const [listMostViewData, setListMostViewData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await datasetApi.getAll({ orderBy: ['view'] })
      setListMostViewData(res?.data ?? [])
    }

    fetchData()
  }, [])

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    return <button
      className={cx('react-multiple-carousel__arrow', 'react-multiple-carousel__arrow--left')}
      onClick={() => onClick()}>
    </button>;
  }

  const CustomRightArrow = ({ onClick, ...rest }) => {
    return <button
      className={cx('react-multiple-carousel__arrow', 'react-multiple-carousel__arrow--right')}
      onClick={() => onClick()}>
    </button>;
  }

  return (
    <div
      className={cx('section-mostview')}
      style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-graphics.png')})` }}>
      <div className="container">
        <div className={cx('card', 'card-mostview-data', 'bg-transparent')}>
          <div className='card-body p-0'>
            <h4 className={cx('m-0', 'text-center', 'fs-1', 'title')}>
              <img
                src={toAbsoluteUrl('media/images/website.png')}
                className='h-40px me-3'
                alt='' />
              Dữ liệu xem nhiều
            </h4>
            <div className={cx('carousel-wrapper')}>
              <Carousel
                additionalTransfrom={0}
                arrows={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                autoPlay
                autoPlaySpeed={8000}
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
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                  }
                }}
                showDots={false}
                sliderclassName=''
                slidesToSlide={1}
                swipeable
              >
                {listMostViewData.map((i) => (
                  <div
                    className={cx(
                      'item-mostview-data',
                      'bg-body shadow-sm mx-3'
                    )}
                    key={i.id}
                  >
                    <div className={cx('item-mostview-data_header')}>
                      <img
                        src={i?.category?.imageUrl
                          ? `${process.env.REACT_APP_FILE_URL}/${i?.category?.imageUrl}`
                          : ''}
                        alt='' />
                      <span>{i?.name}</span>
                    </div>
                    <div className={cx('item-mostview-data_content')}>
                      <Link to='/Du-lieu-chi-tiet'>
                        {i?.description ?? 'Xem thêm mô tả ...'}
                      </Link>
                    </div>
                    <div className={cx('item-mostview-data_footer')}>
                      <div className={cx('row', 'row-viewcount')}>
                        <div className={cx('col-auto', 'col-views')}>
                          <span className='far fa-eye'></span> {i?.view ?? 0} lượt xem
                        </div>
                        <div className={cx('col', 'col-date')}>
                          {getCurrentDate()}<span className='far fa-clock'></span>
                        </div>
                      </div>
                      <div className={cx('row-bottom', 'row')}>
                        <div className={cx('col-auto')}>
                          <Link
                            to={`/du-lieu-chi-tiet/${i.id}`}
                            className={cx('text-danger', 'py-2', 'btn-viewdetail')}
                          >
                            Chi tiết
                            <span className='far fa-long-arrow-right'></span>
                          </Link>
                        </div>
                        <div className='col text-end'>
                          <span className={cx('badge', 'badge-info', 'ms-1')} title='WEB'>
                            <i className='fab fa-internet-explorer fa-fw'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                )}
              </Carousel>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMostViewedDatas
