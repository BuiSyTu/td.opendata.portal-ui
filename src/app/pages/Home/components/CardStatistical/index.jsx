/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import styles from './CardStatistical.module.scss'
import { toAbsoluteUrl } from 'src/_metronic/helpers'

const cx = classNames.bind(styles)

const StatisticalOrganization = () => {
  const [options, setOptions] = useState(null)
  const color = ["#636efa", "#ef553c", "#54cd96", "#ab63fa", "#f9a15a", "#40d3f3", "#f36692", "#b6e880", "#f097ff", "#fecb52", "#444fdb", "#f7a799", "#67fcc9", "#e0c6fc"]
  useEffect(() => {
    var _data = [
      {
        name: 'Văn phòng UBND tỉnh',
        y: 25
      },
      {
        name: 'Sở Công thương',
        y: 10
      },
      {
        name: 'Sở Giáo dục và Đào tạo',
        y: 5
      },
      {
        name: 'Sở Giao thông vận tải',
        y: 8
      },
      {
        name: 'Sở Kế hoạch và Đầu tư',
        y: 11
      },
      {
        name: 'Sở Khoa học và Công nghệ',
        y: 9
      },
      {
        name: 'Sở Lao động -Thương Binh và Xã hội',
        y: 13
      },
      {
        name: 'Sở Tài chính',
        y: 23
      },
      {
        name: 'Sở Tài nguyên và Môi trường',
        y: 5
      }
    ];
    var _sum = 0;
    if (_data) {
      for (var i = 0; i < _data.length; i++)
        if (_data[i].y > 0) {
          // eslint-disable-next-line no-unused-vars
          _sum += _data[i].y;
        }
    }

    var isBig = window.innerWidth > 1199;
    var legendBig = {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      useHTML: true,
      y: 0,
      x: 0,
      padding: 10,
      margin: 0,
      itemWidth: 240,
      maxHeight: 250,
      labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto fs-6" style="color: {color}">{y}</b><br/>',
      itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "roboto", "lineHeight": "25px", "top": "-3px" }
    };

    var legendSmall = {
      align: 'left',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      useHTML: true,
      y: 0,
      x: 0,
      padding: 0,
      margin: 0,
      labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto">{y}</b><br/>',
      itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial" }
    }
    var option = {
      chart: {
        type: 'pie',
        renderTo: 'containersss'
      },
      colors: color,
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },
        series: {
          borderWidth: 0,
          innerSize: '50%',
          dataLabels: {
            enabled: true,
            format: '{point.y:.0f}'
          }
        }
      },
      legend: isBig ? legendBig : legendSmall,
      series: [
        {
          data: _data,
        },
      ],
      credits: {
        enabled: false,
      },
    };
    setOptions(option)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: "280px" } }} />
  </>
}
const CardStatistical = () => {

  const listCategory = [
    {
      name: 'Dữ liệu',
      count: 75,
      icon: 'statistical (3).png',
      slug: 'du-lieu'
    },
    {
      name: 'Tổ chức',
      count: 23,
      icon: 'statistical (4).png',
      slug: 'to-chuc'
    },
    {
      name: 'Nhóm',
      count: 15,
      icon: 'statistical (1).png',
      slug: 'nhom'
    },
    {
      name: 'Người sử dụng',
      count: 71,
      icon: 'statistical (2).png',
      slug: ''
    }
  ]

  const dataGroup = [
    {
      name: 'Tài nguyên - Môi trường',
      count: 6
    },
    {
      name: 'Văn hóa - Thể thao - Du lịch',
      count: 5
    },
    {
      name: 'Tài chính - Doanh nghiệp',
      count: 7
    },
    {
      name: 'Giáo dục - Đào tạo',
      count: 4
    },
    {
      name: 'Thương Mại - Dịch vụ',
      count: 8
    },
    {
      name: 'Khoa học - Công nghệ',
      count: 3
    },
    {
      name: 'Nông - Lâm - Ngư nghiệp',
      count: 7
    },
    {
      name: 'Giao thông - Vận tải',
      count: 9
    },
    {
      name: 'Công nghiệp',
      count: 5
    }
  ]
  const maxValueOfQuaHan = Math.max(...dataGroup.map(o => o.count), 0);

  return (
    <>
      <div
        className={cx('section-statistical')}
        style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-analytics.png')})` }}>
        <div className="container">
          <h4 className={cx('title', 'fs-1', 'fw-bold')}>
            <img src={toAbsoluteUrl('media/images/analytics.png')} className="h-40px me-3" alt="" />
            Thống kê
          </h4>
          <div className="row">
            {listCategory.map((item, index) => (
              <div className="col-lg-6 col-xl-3 mb-4 mb-xl-0" key={index}>
                <div className="card shadow-sm">
                  {item.slug
                    ? (
                      <Link to={item.slug} className={cx('hover-gray')}>
                        <div className="card-body p-4">
                          <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-start flex-column'>
                              <h4 className='text-gray-800 fw-bold fs-5'>{item.name}</h4>
                              <h3 className='m-0 text-danger fs-1'>{item.count}</h3>
                            </div>
                            <div className="statistical-thumb">
                              <img src={toAbsoluteUrl(`media/images/${item.icon}`)} className="w-60px" alt="" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                    : (
                      <div className="card-body p-4">
                        <div className='d-flex align-items-center justify-content-between'>
                          <div className='d-flex align-items-start flex-column'>
                            <h4 className='text-gray-800 fw-bold fs-5'>{item.name}</h4>
                            <h3 className='m-0 text-danger fs-1'>{item.count}</h3>
                          </div>
                          <div className="statistical-thumb">
                            <img src={toAbsoluteUrl(`media/images/${item.icon}`)} className="w-60px" alt="" />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-12 col-xl-6 mb-4 mb-xl-0">
              <div className='card shadow-sm min-h-100 card-organization'>
                <div className="card-header px-4">
                  <div className="card-title text-center">Dữ liệu mở theo tổ chức</div>
                </div>
                <div className="card-body p-4 scroll mh-350px">
                  <StatisticalOrganization />
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className='card shadow-sm min-h-100'>
                <div className="card-header px-4">
                  <div className="card-title text-center">Dữ liệu mở theo tổ nhóm</div>
                </div>
                <div className="card-body p-4 scroll mh-350px">
                  <div className="col-12">
                    {dataGroup.map((i, index) => (
                      <div className="row align-items-center mb-2" key={index}>
                        <div className="col-xl-5 col-xxl-4">
                          <span className={cx('text-gray-800 d-block fs-6 text-xl-end', 'item-group-name')}>{i.name}</span>
                        </div>
                        <div className="col-xl-7 col-xxl-8 d-flex align-items-center">
                          <div className="progress h-15px w-100 me-2 bg-secondary" style={{ borderRadius: '4px' }}>
                            <div className={cx('progress-bar', 'bg-danger')} role="progressbar" style={{ width: (i.count / maxValueOfQuaHan) * 100 + '%' }} aria-valuenow={i.count} aria-valuemin="0" aria-valuemax={maxValueOfQuaHan}></div>
                          </div>
                          <span className="text-gray-800 fs-6 fs-xxl-5 min-w-30px text-center">{i.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardStatistical
