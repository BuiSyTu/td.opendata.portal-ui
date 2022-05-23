import { TabPane, Tabs } from 'antd'

import { toAbsoluteUrl } from 'src/_metronic/helpers'

const DataDetailPage = () => {
    return (
        <>
            <div className={`card shadow-sm card-datadetail`}>
                {/* begin::Body */}
                <div className='card-body p-3 p-md-5 px-md-8'>
                    <div className="row border-bottom border-warning">
                        <div className="col-12 col-md-auto pb-4 pb-md-0 text-center">
                            <img src={toAbsoluteUrl('media/images/documents.png')} className="h-50px" alt='' />
                            <div className="row">
                                <div class="pt-3 pb-2 ratings">
                                    <i class="fas fa-star rating-star"></i>
                                    <i class="fas fa-star rating-star"></i>
                                    <i class="fas fa-star rating-star"></i>
                                    <i class="fas fa-star-half-alt rating-star"></i>
                                    <i class="far fa-star rating-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md border-start border-gray-300">
                            <h3 className='fw-bold mb-4 text-primary card-datadetail_title'>Tổng mức bán lẻ hàng hóa và doanh thu dịch vụ tiêu dùng tháng 4/2022</h3>
                            <div className="row border-top border-gray-300">
                                <div className="col-12 py-2 col-md-auto border-end border-gray-300">
                                    <span className='far fa-clock text-danger'></span> <b>Ngày cập nhật:</b> 10/05/2022
                                </div>
                                <div className="col-12 py-2 col-md-auto border-end border-gray-300">
                                    <span className='fal fa-file-certificate text-danger'></span> <b>Lĩnh vực:</b> Quản lý Nhà nước
                                </div>
                                <div className="col-12 py-2 col-md">
                                    <span className='far fa-landmark text-danger'></span> <b>Cơ quan chủ quản:</b> Ban Quản lý An toàn thực phẩm thành phố
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-5 pt-md-7">
                        <p className='m-0'>Ban Quản lý an toàn thực phẩm Đà Nẵng , công khai thông tin các cơ sở đạt tiêu chuẩn an toàn vệ sinh thực phẩm trên địa bàn thành phố Đà Nẵng (SL tính đến ngày 10/5/2022). Người dân và doanh nghiệp quan tâm có thể tra cứu thông tin các cơ sở đạt tiêu chuẩn an toàn vệ sinh thực phẩm trực tiếp tại đây.</p>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm card-datadetail mt-6">
                <Tabs defaultActiveKey="1" className='px-0'>
                    <TabPane
                        tab={
                            <span>
                                <img src={`${toAbsoluteUrl('media/images/browser.png')}`} className="w-25px me-2" alt='' />
                                {/* <span className='badge badge-sm badge-info p-1 me-2'>
                      <i className='fab fa-internet-explorer text-white'></i>
                    </span> */}
                                Dịch vụ web
                            </span>
                        }
                        key="1"
                    >
                        Tab Web
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                {/* <span className='badge badge-sm badge-primary p-1 me-2'>
                      <i className='fas fa-sms text-white'></i>
                    </span> */}
                                <img src={`${toAbsoluteUrl('media/images/chat.png')}`} className="w-25px me-2" alt='' />
                                Dịch vụ SMS
                            </span>
                        }
                        key="2"
                    >
                        Tab SMS
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                {/* <span className='badge badge-sm badge-danger p-1 me-2'>Zalo</span> */}
                                <img src={`${toAbsoluteUrl('media/images/zalo.png')}`} className="w-25px me-2" alt='' />
                                Dịch vụ Zalo
                            </span>
                        }
                        key="3"
                    >
                        Tab Zalo
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default DataDetailPage