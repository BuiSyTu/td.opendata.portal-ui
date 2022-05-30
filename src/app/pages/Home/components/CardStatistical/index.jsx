/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import styles from './CardStatistical.module.scss'
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import StatisticalOrganization from './StatisticalOrganization';

const cx = classNames.bind(styles)


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
      name: 'Lĩnh vực',
      count: 15,
      icon: 'statistical (1).png',
      slug: 'nhom'
    },
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
    <div
      className={cx('section-statistical')}
      style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-graphics.png')})` }}>
      <div className="container">
        <h4 className={cx('title', 'fs-1', 'fw-bold')}>
          <img src={toAbsoluteUrl('media/images/analytics.png')} className="h-40px me-3" alt="" />
          Thống kê
        </h4>
        <div className="row">
          {listCategory.map((item, index) => (
            <div className="col-lg-4 col-xl-4 mb-4 mb-xl-0" key={index}>
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
                <div className="card-title text-center">Dữ liệu mở theo lĩnh vực</div>
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
  )
}

export default CardStatistical
