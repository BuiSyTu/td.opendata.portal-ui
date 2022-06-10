import React from 'react'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom';

import './CardNewsCarousel.scss'

import { toAbsoluteUrl } from 'src/_metronic/helpers'

const CardNewsCarousel = () => {

    const listNews = [
        {
            name: 'Quy Định Cấp Giấy Phép Hoạt Động Đối Với Cơ Sở Khám Chữa Bệnh',
            thumb: 'news-1.jpg',
            date: '12-5-2022',
            description: 'Căn cứ Luật tổ chức Chính phủ ngày 19 tháng 6 năm 2015;,Căn cứ Luật đầu tư ngày 26 tháng 11 năm 2014;,Căn cứ Luật khám bệnh, chữa bệnh ngày 23 tháng 11 năm 2009;',
            slug: 'Quy-dinh-cap-giay-phep.html'
        },
        {
            name: 'Hướng dẫn kiểm tra, đánh giá chất lượng bệnh viện năm 2018',
            thumb: 'news-2.jpg',
            date: '12-5-2022',
            description: 'Thực hiện Quyết định số 6328/QĐ-BYT ngày 18/10/2018 của Bộ trưởng Bộ Y tế về việc ban hành nội dung kiểm tra, đánh giá chất lượng bệnh viện và khảo sát hài lòng người bệnh',
            slug: 'Quy-dinh-cap-giay-phep.html'
        },
        {
            name: 'Hướng dẫn cấp chứng chỉ hành nghề đối với người hành nghề',
            thumb: 'news-3.jpg',
            date: '12-5-2022',
            description: 'Hướng dẫn cấp chứng chỉ hành nghề đối với người hành nghề và cấp giấy phép hoạt động đối với cơ sở khám bệnh, chữa bệnh,Căn cứ Luật khám bệnh, chữa bệnh ngày 23 tháng 11 năm 2009',
            slug: 'Quy-dinh-cap-giay-phep.html'
        },
        {
            name: 'TPHCM lập kho dữ liệu mở hỗ trợ doanh nghiệp',
            thumb: 'news-4.jpg',
            date: '12-5-2022',
            description: 'Dự kiến vào cuối tháng này, UBND TPHCM sẽ phê duyệt kế hoạch xây dựng kho dữ liệu dùng chung và phát triển hệ sinh thái dữ liệu mở (open data) nhằm giúp người dân, doanh nghiệp có dữ liệu',
            slug: 'Quy-dinh-cap-giay-phep.html'
        }
    ]

    return (
        <div className="section-news"
            style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-graphics.png')})` }}>
            <div className="container">
                <h4 className="title fs-1 fw-bold"><img src={toAbsoluteUrl('media/images/slider.png')} className="h-40px me-3" alt="" />Tin tức & Sự kiện</h4>
                <div className="news-carousel-outer">
                    <Carousel
                        additionalTransfrom={0}
                        arrows={false}
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
                                items: 4,
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
                        showDots={true}
                        sliderclassName=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {listNews.map((i, index) => (
                            <div className='item-new h-100 mx-3 shadow-sm' key={index}>
                                <div className="item-new_thumb">
                                    <Link to={'/tin-tuc/' + i.slug}>
                                        <img className='w-100 h-175px' src={i.thumb ? toAbsoluteUrl(`media/articles/${i.thumb}`) : ''} alt="" />
                                    </Link>
                                </div>
                                <div className="item-new_content p-3 p-xl-4">
                                    <Link to={'/tin-tuc/' + i.slug}>{i.name}</Link>
                                    <p className="m-0">{i.description}</p>
                                </div>
                                <div className="item-new_footer">
                                    <div className="row">
                                        <div className="col">
                                            <Link to={'/tin-tuc/' + i.slug} className="text-danger btn-more">Chi tiết <span className="far fa-long-arrow-right"></span></Link>
                                        </div>
                                        <div className="col text-end">
                                            <p className="m-0 date" title='Ngày đăng'>{i.date} <span className="far fa-clock"></span></p>
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
    )
}

export default CardNewsCarousel
