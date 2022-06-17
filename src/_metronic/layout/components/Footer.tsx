import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { footerConfigApi } from 'src/app/apis/footerConfig'

import { FooterConfig } from 'src/models'
import { toAbsoluteUrl } from '../../helpers'

const Footer: FC = () => {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>()

  useEffect(() => {
    const fetchFooterConfig = async () => {
      const res = await footerConfigApi.get()

      if (res) {
        setFooterConfig(res?.data ?? null)
      }
    }

    fetchFooterConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='footer py-4' id='kt_footer' style={{ backgroundImage: `url(${toAbsoluteUrl('/media/images/footer-bg.png')})` }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <h3 className='fs-4 text-white mb-2'>{footerConfig?.softwareName ?? ''}</h3>
            <p className='text-white mb-0'><strong>{footerConfig?.companyName ?? ''}</strong></p>
            <p className='text-white mb-0'><strong>Địa chỉ: </strong>{footerConfig?.address ?? ''}</p>
            <p className='text-white mb-0'><strong>Điện thoại: </strong>{footerConfig?.phoneNumber ?? ''}<strong>Fax: </strong>{footerConfig?.fax ?? ''}</p>
            <p className='text-white mb-0'><strong>Hotline: </strong>{footerConfig?.hotLine ?? ''}</p>
            <p className='text-white mb-0'><strong>Email: </strong>{footerConfig?.email ?? ''}</p>
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
