import './GuideWrapper.scss'

import React from 'react'
import { Tabs } from 'antd'

function callback(key) {
  console.log(key)
}

const { TabPane } = Tabs

const GuidePage = () => {
  return (
    <>
      <div className='card'>
        <div className='card-header px-3'>
          <div className='card-title text-primary'>
            <span className='fad fa-file-alt me-3 text-primary'></span>Hướng dẫn sử dụng
          </div>
        </div>
        <div className='card-body p-5'>
          <div className='container-gruid' style={{ backgroundColor: '' }}>
            <Tabs defaultActiveKey='1' onChange={callback} type='card'>
              <TabPane tab='Đăng ký' key='dangky'>
                <div className='tab-content'>
                  <div role='tabpanel' className='tab-pane active' id='home'>
                    <div className='' style={{ fontFamily: 'initial', fontSize: '18px' }}>
                      <div className='col'>
                        <p>
                          <span
                            style={{
                              color: '#23282c',
                              marginBottom: '10px',
                              fontWeight: 'bolder',
                              fontSize: '18px',
                            }}
                          >
                            Từ Hệ thống Phản ánh hiện trường Hải Dương tại địa chỉ{' '}
                          </span>
                          <span style={{ fontWeight: 'bolder', fontSize: '18px' }}>
                            <a
                              href='https://tuongtachd.hanhchinhcong.net'
                              style={{ color: '#167495' }}
                            >
                              https://tuongtachd.hanhchinhcong.net
                            </a>
                          </span>
                          <span style={{ color: '#23282c', fontWeight: 'bolder' }}>
                            {' '}
                            thực hiện các bước:
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                        <div className='d-flex'>
                          <span className='fw-bold text-danger me-2'>Bước 1: </span> Chọn chức năng{' '}
                          <span className='fw-bold px-3'>ĐĂNG KÝ</span> trên thanh Menu
                        </div>
                      </div>
                      <img
                        style={{ margin: '10px auto 20px auto', display: 'block' }}
                        src={require('../../images/dangky.png').default}
                        alt=''
                      />
                    </div>
                    <div>
                      <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                        <span className='fw-bold text-danger'>Bước 2: </span>Nhập đầy đủ thông tin
                        các trường bắt buộc (<span className='text-danger'>*</span>), bao gồm:
                      </div>
                      <div className='pt-5 ps-5'>
                        <p>
                          <span className='fw-bold'>Họ và tên: </span>Họ tên đầy đủ người đăng ký
                        </p>
                        <p>
                          <span className='fw-bold'>Ngày sinh: </span>Ngày sinh của người đăng ký
                        </p>
                        <p>
                          <span className='fw-bold'>Số điện thoai: </span>Số điện thoại người đăng ký
                          (được sử dụng làm ID tài khoản đăng nhập)
                        </p>
                        <p>
                          <span className='fw-bold'>Email: </span>Hộp thư điện tử người đăng ký
                        </p>
                        <p>
                          <span className='fw-bold'>Mật khẩu: </span>Mật khẩu bảo mật tài khoản
                        </p>
                        <p>
                          <span className='fw-bold'>Nhập lại mật khẩu: </span>Xác nhận lại mật khẩu
                        </p>
                      </div>
                      <img
                        style={{ margin: '10px auto 20px auto', display: 'block' }}
                        src={require('../../images/formdangky.png').default}
                        alt=''
                      />
                    </div>
                    <div>
                      <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                        <span className='fw-bold text-danger me-2'>Bước 3:</span>Nhấn nút
                        <span className='fw-bold px-3'> Đăng ký</span> trên màn hình. Hệ thống sẽ
                        kiểm tra và xác nhận tài khoản. Sau khi Hệ thống thông báo Đăng ký tài khoản
                        thành công, bạn có thể đăng nhập Hệ thống bằng tài khoản vừa tạo
                        <div className=' text-center'></div>
                      </div>
                      <img
                        style={{ margin: '10px auto 20px auto', display: 'block' }}
                        src={require('../../images/dangkythanhcong.png').default}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab='Gửi phản ánh' key='phananh'>
                <div role='tabpanel' className='tab-pane' id='profile'>
                  <div className='' style={{ fontFamily: 'initial', fontSize: '18px' }}>
                    <div className='col'>
                      <p>
                        <span style={{ color: '#23282c', fontWeight: 'bolder' }}>
                          Từ Hệ thống Phản ánh hiện trường Hải Dương tại địa chỉ{' '}
                        </span>
                        <span style={{ fontWeight: 'bolder' }}>
                          <a href='https://tuongtachd.hanhchinhcong.net' style={{ color: '#167495' }}>
                            https://tuongtachd.hanhchinhcong.net
                          </a>
                        </span>
                        <span style={{ color: '#23282c', fontWeight: 'bolder' }}>
                          {' '}
                          thực hiện các bước:
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                    <span className='fw-bold text-danger me-2'>Bước 1:</span> Chọn chức năng{' '}
                    <span className='fw-bold px-2'>Gửi phản ánh</span> trên thanh Menu
                  </div>
                  <div>
                    <img
                      style={{ margin: '10px auto 20px auto', display: 'block' }}
                      src={require('../../images/guiphananh.png').default}
                      alt=''
                    />
                  </div>
                  <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                    <span className='fw-bold text-danger me-2'>Bước 2:</span>Nhập đầy đủ thông tin
                    các trường bắt buộc (<span className='fw-bolder text-danger'>*</span>), bao gồm:
                  </div>
                  <div className='pt-3 ps-5'>
                    <p>
                      <span className='fw-bold me-2'>Họ và tên:</span>Họ tên đầy đủ người đăng ký
                    </p>
                    <p>
                      <span className='fw-bold me-2'>CMND:</span>Số chứng minh nhân dân
                    </p>

                    <p>
                      <span className='fw-bold me-2'>Email:</span>Hộp thư điện tử người đăng ký
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Số điện thoai:</span>Số điện thoại người đăng
                      ký
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Lĩnh vực:</span>Lĩnh vực sự việc xảy ra
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Tiêu đề:</span>Tóm tắt ý kiến cần phản ánh
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Nội dung:</span>Miêu tả chi tiết ý kiến cần
                      phản ánh, kiến nghị
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Đính kèm:</span>Các tệp tin liên quan tới phản
                      ánh, kiến nghị (nếu có)
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Địa chỉ:</span>Địa chỉ chi tiết nơi xảy ra sự
                      việc
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Vị trí:</span>Bản đồ vị trí nơi xảy ra sự việc
                    </p>
                    <p>
                      <span className='fw-bold me-2'>Capcha:</span>Mã xác thực
                    </p>
                  </div>
                  <img
                    style={{ margin: '10px auto 20px auto', display: 'block' }}
                    src={require('../../images/formphananh.png').default}
                    alt=''
                  />
                </div>
                <div className=''>
                  <div className='notice bg-light-warning rounded border-warning border border-dashed p-6'>
                    <span className='fw-bold text-danger me-2'>Bước 3:</span>Nhấn nút{' '}
                    <span className='fw-bold px-2'>Gửi phản ánh</span>trên màn hình. Hệ thống sẽ
                    kiểm tra và xác nhận ý kiến phản ánh - kiến nghị.
                    <div className=' text-center'></div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

const GuideWrapper = () => {
  return (
    <>
      <GuidePage />
    </>
  )
}
export { GuideWrapper }
