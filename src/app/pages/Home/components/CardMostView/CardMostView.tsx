import styles from './CardMostView.module.scss'

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'

import { datasetApi } from 'src/app/apis'
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

  const CustomLeftArrow = ({ onClick, ...rest }: any) => {
    return (
      <button
        className={cx('react-multiple-carousel__arrow', 'react-multiple-carousel__arrow--left')}
        onClick={() => onClick()}>
      </button>
    )
  }

  const CustomRightArrow = ({ onClick, ...rest }: any) => {
    return (
      <button
        className={cx('react-multiple-carousel__arrow', 'react-multiple-carousel__arrow--right')}
        onClick={() => onClick()}>
      </button>
    )
  }

  return (
    <div className={cx('section-mostview')} >
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
                draggable={false}
                focusOnSelect={false}
                infinite
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
                slidesToSlide={1}
                swipeable
              >
                {listMostViewData.map((i: any) => (
                  <div
                    className={cx(
                      'item-mostview-wrapper',
                      'bg-body shadow-sm mx-3'
                    )}
                    key={i.id}
                  >
                    <div className={cx('item-mostview-header')}>
                      <img
                        src={i?.category?.imageUrl
                          ? `${process.env.REACT_APP_FILE_URL}/${i?.category?.imageUrl}`
                          : ''}
                        alt='' />
                      <span>{i?.name}</span>
                    </div>
                    <div className={cx('item-mostview-content')}>
                      {i?.description ?? 'Xem thêm mô tả ...'}
                    </div>
                    <div className={cx('item-mostview-footer')}>
                      <div className={cx('row', 'row-viewcount')}>
                        <div className={cx('col-auto')}>
                          <span className='far fa-eye'></span> {i?.view ?? 0} lượt xem
                        </div>
                        <div className={cx('col', 'col-date')}>
                          {i?.createdOn
                            ? moment(i?.createdOn).format('DD/MM/YYYY')
                            : i.lastModifiedOn
                              ? moment(i?.lastModifiedOn).format('DD/MM/YYYY')
                              : ''}
                          <span className='far fa-clock'></span>
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
                          <span className={cx('badge')} title='WEB'>
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
