/* eslint-disable jsx-a11y/anchor-is-valid */

import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../helpers'

const Footer: FC = () => {
  return (
    <div className='footer py-4' id='kt_footer' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/images/footer-bg.png')})` }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <h3 className='fs-4 text-white mb-2'>© CỔNG DỮ LIỆU MỞ</h3>
            <p className='text-white mb-0'><strong>Công ty Cổ phần Tin học Tân Dân</strong></p>
            <p className='text-white mb-0'><strong>Địa chỉ</strong>: Tầng 3 nhà B, Số 60 Thịnh Hào 1 - Phố Tôn Đức Thắng - Đống Đa - Hà Nội</p>
            <p className='text-white mb-0'><strong>Điện thoại</strong>: (+84)(24)3847.1894 - (+84)(24)3823.0041 - <strong>Fax:</strong> (+84)(24)3847.1895</p>
            <p className='text-white mb-0'><strong>Hotline:</strong> 0904.358.501 - 0912.522.861 - 0985.915.920</p>
            <p className='text-white mb-0'><strong>Email</strong>: contact@tandan.com.vn </p>
          </div>
          <div className="col-xl-3 my-5 my-xl-0 col-footer-right">
            <h4 className="text-white fw-bold text-uppercase fs-4 mb-xl-6">Truy cập nhanh</h4>
            <p className='mb-1'><Link to={'/gioi-thieu'} className="text-white text-hover-warning">Giới thiệu</Link></p>
            <p className='mb-1'><Link to={'/huong-dan'} className="text-white text-hover-warning">Hướng dẫn sử dụng</Link></p>
            <p className='mb-1'><Link to={'/lien-he'} className="text-white text-hover-warning">Liên hệ hỗ trợ</Link></p>
          </div>
          <div className="col-xl-3 col-footer-social">
            <h4 className="text-white fw-bold text-uppercase fs-4 mb-xl-6">Liên kết website</h4>
            <select name="" id="" className='form-control form-control-sm'>
              <option value="1">Chọn liên kết</option>
              <option value="2">...</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Footer }
