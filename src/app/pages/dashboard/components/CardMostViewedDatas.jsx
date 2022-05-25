import './Item.scss'

import React, { useEffect, useState } from 'react'

import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom';
import { datasetApi } from 'src/app/apis/dataset'
import { getCurrentDate } from 'src/utils/common';
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import { useDispatch } from 'react-redux';
import { setDatasetId } from 'src/setup/redux/dataset/Slice';

const CardMostViewedDatas = () => {
  const dispatch = useDispatch()
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
      className='react-multiple-carousel__arrow react-multiple-carousel__arrow--left'
      onClick={() => onClick()}>
        <span className='fas fa-arrow-left'></span>
      </button>;
  }

  const CustomRightArrow = ({ onClick, ...rest }) => {
    return <button
      className='react-multiple-carousel__arrow react-multiple-carousel__arrow--right'
      onClick={() => onClick()}>
        <span className='fas fa-arrow-right'></span>
      </button>;
  }

  const handleClickDatasetId = (datasetId) => dispatch(setDatasetId(datasetId))

  return (
    <>
      <div className="card card-mostview-data bg-transparent">
        <div className="card-body p-0">
          <h4 className='m-0 text-center fs-1 title'>
            <img
              src={toAbsoluteUrl('media/images/website.png')}
              className="h-40px me-3"
              alt="" />
            Dữ liệu xem nhiều
          </h4>
          <Carousel
            additionalTransfrom={0}
            arrows={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            autoPlay
            autoPlaySpeed={8000}
            centerMode={false}
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
            sliderclassName=""
            slidesToSlide={1}
            swipeable
          >
            {listMostViewData.map((i, index) => (
              <div className='item-mostview-data bg-body shadow-sm mx-3' key={index}>
                <div className="item-mostview-data_header">
                  <img
                    src={i?.category?.imageUrl
                      ? `https://192.168.2.169:5001/${i?.category?.imageUrl}`
                      : ''}
                    alt="" />
                  <span>{i?.name}</span>
                </div>
                <div className="item-mostview-data_content">
                  <Link to='/Du-lieu-chi-tiet'>
                    {i?.description ?? 'Xem thêm mô tả ...'}
                  </Link>
                </div>
                <div className="item-mostview-data_footer">
                  <div className="row row-viewcount">
                    <div className="col-auto col-views">
                      <span className='far fa-eye'></span> {i?.view ?? 0} lượt xem
                    </div>
                    <div className="col col-date">
                      {getCurrentDate()}<span className='far fa-clock'></span>
                    </div>
                  </div>
                  <div className="row row-bottom">
                    <div className="col-auto">
                      <Link
                        to={`/du-lieu-chi-tiet/${i.id}`}
                        className="text-danger py-2 btn-viewdetail"
                      >
                        Chi tiết
                        <span className='far fa-long-arrow-right'></span>
                      </Link>
                    </div>
                    <div className="col text-end">
                      <span className="badge badge-primary" title='SMS'><i className='fas fa-sms fa-fw'></i></span>
                      <span className="badge badge-info ms-1" title='WEB'><i className='fab fa-internet-explorer fa-fw'></i></span>
                      <span className="badge badge-danger ms-1" title='Zalo'>Zalo</span>
                    </div>
                  </div>
                </div>
              </div>
            )
            )}
          </Carousel>
        </div>
      </div>
    </>
  )
}

export { CardMostViewedDatas }
