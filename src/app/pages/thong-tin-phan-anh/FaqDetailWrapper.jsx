import './FaqDetail.scss'
import 'react-multi-carousel/lib/styles.css'

import {Comment, Image, Input, notification} from 'antd'
import React, { useEffect, useState } from 'react'

import {CONFIG} from '../../../helpers/config'
import Carousel from 'react-multi-carousel'
/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment'
import {requestPOST} from '../../../helpers/baseAPI'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const FaqDetailPage = () => {
  const accessToken = useSelector((state) => state.auth.accessToken)
  const user = useSelector((state) => state.auth.user)
  const [update, setUpdate] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [comments, setComments] = useState([])

  const [data, setData] = useState(null)
  const [fileContentImgs, setFileContentImgs] = useState([])
  const [fileContents, setFileContents] = useState([])
  const [fileReplys, setFileReplys] = useState([])
  const [fileReplyImgs, setFileReplyImgs] = useState([])
  const [fileReplyPdf, setFileReplyPdf] = useState('')

  const {id} = useParams()
  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 3000},
      items: 1,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 1,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 1,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
    },
  }
  useEffect(() => {
    const fetchData = async () => {
      var body = {
        id: id,
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/ChiTietPhanAnh', body)
      let _res = res?.data ?? null
      setData(_res)
      if (_res?.DinhKem && _res?.DinhKem?.length > 0) {
        let arr = _res?.DinhKem.split('##')
        let tmps = []
        let tmpImg = []
        arr?.forEach((i) => {
          if (
            i.toLowerCase().includes('.jpg') ||
            i.toLowerCase().includes('.jpeg') ||
            i.toLowerCase().includes('.png') ||
            i.toLowerCase().includes('.mp4')
          ) {
            tmpImg.push(`${CONFIG.FILE_URL + i}`)
          } else {
            tmps.push(`${CONFIG.FILE_URL + i}`)
          }
        })
        setFileContentImgs(tmpImg)
        setFileContents(tmps)
      }
      if (_res?.DinhKemTraLoi && _res?.DinhKemTraLoi?.length > 0) {
        let tmps = []
        let tmpImg = []
        let arr = _res?.DinhKemTraLoi.split('##')
        arr?.forEach((i) => {
          if (
            i.toLowerCase().includes('.jpg') ||
            i.toLowerCase().includes('.jpeg') ||
            i.toLowerCase().includes('.png')
          ) {
            tmpImg.push(`${CONFIG.FILE_URL + i}`)
          } else {
            tmps.push(`${CONFIG.FILE_URL + i}`)
          }
        })
        let ind = tmps?.findIndex((i) => i.toLowerCase().includes('.pdf')) || -1
        setFileReplyPdf(ind > -1 ? tmps[ind] : '')
        setFileReplyImgs(tmpImg)
        setFileReplys(tmps)
      }
      setComments(_res?.Comment ?? [])
      setUpdate(false)
    }

    try {
      if (update) {
        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
    return () => {}
  }, [id, update])

  const ExampleComment = () => (
    <div>
      {comments.map((comment, index) => (
        <div>
          <Comment
            key={index}
            //actions={[<span key='comment-nested-reply-to'>Trả lời</span>]}
            author={comment?.NguoiTao ?? ''}
            avatar={
              <div className='symbol symbol-30px symbol-circle me-2'>
                <img src={toAbsoluteUrl('/media/avatars/user.svg')} alt='' />
              </div>
            }
            content={
              <p className=''>
                {comment?.NoiDung ?? ''}
                <p className='text-gray-600 fs-8 fst-italic'>
                  {comment?.ThoiGianGui
                    ? moment(comment?.ThoiGianGui).format('DD/MM/YYYY HH:mm')
                    : ''}
                </p>
              </p>
            }
          >
            {}
          </Comment>
          {/* {index < comments?.length - 1 ? <div style={{borderTop: '1px dashed #cfcfcf'}} /> : <></>} */}
          <div style={{borderTop: '1px dashed #cfcfcf'}} />
        </div>
      ))}
    </div>
  )

  const PostComment = async () => {
    var newComment = {
      PhanAnhID: Number(id),
      NguoiTao: user?.fullName ?? 'accountname',
      NoiDung: inputValue,
      TaiKhoanTao: user?.userName ?? 'username',
    }
    var body = {
      token: accessToken,
      comment: newComment,
    }
    try {
      let res = await requestPOST(CONFIG.PAHT_PATH + '/CreateComment', body)
      if (res != null) {
        notification.success({
          message: 'Bình luận thành công!',
          duration: 1,
        })
        setInputValue('')
        newComment.ThoiGianGui = moment()
        setComments([...comments, newComment])
      } else {
        notification.error({
          message: 'Lỗi',
          duration: 1,
        })
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }
  const getFileName = (fileUrl) => {
    var fileName = ''
    if (fileUrl.length > 0) {
      fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length)
    }
    return fileName
  }
  return (
    <>
      <div className={`card shadow-sm border`}>
        <div className='card-header ribbon ribbon-top ribbon-vertical px-3 min-h-35px'>
          <div className='card-title'>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center flex-grow-1'>
                <div className='symbol symbol-45px symbol-circle me-5'>
                  <img src={toAbsoluteUrl('/media/avatars/user.svg')} alt='' />
                </div>
                <div className='d-flex flex-column'>
                  <a href='#' className='text-primary fs-5 fw-bolder mb-2'>
                    {data?.HoVaTen ?? ''}
                  </a>
                  <span className='text-gray-500 fs-6 fw-normal'>
                    <i className='fad fa-calendar'></i>{' '}
                    {data?.ThoiGianGui
                      ? moment(data?.ThoiGianGui).format('hh:mm DD/MM/YYYY')
                      : '../../../'}{' '}
                    - <i className='fad fa-map-marker-alt'></i> {data?.DiaChi || '...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class='ribbon-label bg-warning min-h-35px'>
            <i class='fas fa-comments fs-4 text-white me-2'></i>
            <label class='fw-bold'>Phản ánh, kiến nghị</label>
          </div>
          {/* <div className='ribbon-label bg-warning'>
            <i className='fas fa-comments fs-4 text-white me-2'></i>
            <label className='fw-bold'>{data.MaSoPAKN}</label>
          </div> */}
        </div>
        <div className='card-body pb-0 p-4'>
          <div className='mb-4'>
            <h2 className='text-primary fs-5 faq-title mb-5'>{data?.TieuDe}</h2>
            <div className='d-flex pt-5 faq-description alert bg-primary bg-opacity-10'>
              <div className='col-auto pe-5'>
                <i className='fs-2x fad fa-quote-left text-primary'></i>
              </div>
              <div className='faq-desc-content' style={{fontSize: '20px !important'}}>
                <p className='text-gray-800 fw-normal fs-6 mb-0'>{data?.NoiDung ?? ''}</p>
              </div>
            </div>
            <div>
              <div className=''>
                {fileContentImgs?.length > 0 ? (
                  <Carousel
                    //autoPlay
                    showDots
                    responsive={responsive}
                  >
                    {fileContentImgs.map((i) =>
                      i.toLowerCase().includes('.mp4') ? (
                        <iframe
                          title='123'
                          width='100%'
                          height={400}
                          src={i}
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope'
                        ></iframe>
                      ) : (
                        <Image src={i} alt='' width='100%' height={400} />
                      )
                    )}
                  </Carousel>
                ) : (
                  <></>
                )}
              </div>

              {fileContents?.length > 0 ? (
                <div className='faq-desc-attach my-5'>
                  <p className='fw-bold text-gray-600 fs-5'>File đính kèm</p>
                  <div className='px-5'>
                    {fileContents.map((i) => (
                      <a
                        href={i}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='py-1 d-block text-gray-600 text-hover-primary '
                      >
                        <span className='fad fa-file-pdf text-primary fs-5 me-2'></span>
                        <span>{getFileName(i)}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className='card-footer p-4 d-flex justify-content-between'>
          <div className='text-warning fs-6 fw-normal'>
            <i className='fa fa-clock text-warning'></i> Hạn xử lý:{' '}
            {data?.NgayHenTra ? moment(data?.NgayHenTra).format('hh:mm DD/MM/YYYY') : '../../../'}
          </div>
        </div>
      </div>

      <div className={`card shadow-sm border mt-5`}>
        <div className='card-header ribbon ribbon-top ribbon-vertical px-3'>
          <div className='card-title'>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center flex-grow-1'>
                <div className='symbol symbol-45px symbol-circle me-5'>
                  <img src={toAbsoluteUrl('/media/avatars/quochuy.jpg')} alt='' />
                </div>
                <div className='d-flex flex-column'>
                  <a href='#' className='text-danger fs-5 fw-bolder mb-2'>
                    {data?.NguoiXuLy || data?.DonVi || 'UBND Quận Đống Đa'}
                  </a>
                  <span className='text-gray-700 fs-6 fw-normal'>
                    <i className='fad fa-calendar'></i> Thời gian trả lời: 16:06 18/09/2021
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='ribbon-label bg-success min-h-35px'>
            <i className='fad fa-file-alt fs-4 text-white me-2'></i>
            <label className='fw-bold'>Nội dung trả lời</label>
          </div>
        </div>
        <div className='card-body pb-0 p-4'>
          <div className='mb-4'>
            <h2 className='text-primary faq-title fs-5 mb-5'>{data?.TieuDeTraLoi ?? ''}</h2>
            <div className='d-flex pt-5 faq-description alert bg-warning bg-opacity-10'>
              <div className='col-auto pe-5'>
                <i className='fs-2x fad fa-quote-left text-warning'></i>
              </div>
              <div className='faq-desc-content'>
                <p className='text-gray-800 fw-normal fs-6 mb-0'>
                  {data?.NoiDungTraLoi || 'Chưa có nội dung trả lời'}
                </p>
              </div>
            </div>
            <div className='faq-desc-attach my-5'>
              <p className='fw-bold text-gray-600 fs-5'>File đính kèm</p>
              {fileReplyPdf?.length > 0 ? (
                <iframe
                  title='File đính kèm'
                  width='100%'
                  height='500px'
                  src={fileReplyPdf}
                ></iframe>
              ) : (
                <></>
              )}
              {fileReplys?.length > 0 ? (
                <div className='px-5'>
                  {fileReplys.map((i) => (
                    <a
                      href={i}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='py-1 d-block text-gray-600 text-hover-primary '
                    >
                      <span className='fad fa-file-pdf text-primary fs-3 me-2'></span>
                      <span>{getFileName(i)}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            {fileReplyImgs?.length > 0 ? (
              <div className=''>
                <div className=''>
                  <h3 className='text-primary alert bg-primary bg-opacity-10 fw-bold'>
                    <i className='fad fa-images fs-5 text-primary'></i> Hình ảnh sau khi xử lý
                  </h3>
                </div>
                <div className=''>
                  <Carousel
                    //autoPlay
                    showDots
                    responsive={responsive}
                  >
                    {fileReplyImgs.map((i) => (
                      <Image src={i} alt='' width='100%' height={400} />
                    ))}
                  </Carousel>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className='card shadow-sm border mt-5'>
        <div className='card-header px-3'>
          <div className='card-title'>
            <div className='d-flex align-items-center'>
              <div className='d-flex flex-column'>
                <a href='#' className='text-primary fs-5 fw-bolder my-2'>
                  <span className='fad fa-comments-alt fs-4 text-primary'></span> Bình luận
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body p-3'>
          <ExampleComment />
          {accessToken ? (
            <div className='d-flex flex-grow-1 my-5'>
              <div className='symbol symbol-40px symbol-circle me-2'>
                <img
                  src={
                    user?.avatarUrl
                      ? `${CONFIG.AVATAR_URL + user?.avatarUrl}`
                      : toAbsoluteUrl('/media/avatars/user.svg')
                  }
                  alt=''
                />
              </div>
              <div className='d-flex flex-column flex-grow-1 '>
                <Input.TextArea
                  value={inputValue}
                  rows={2}
                  placeholder='Nhập bình luận'
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className='mt-2 d-flex justify-content-end'>
                  <a
                    className='btn btn-sm btn-primary py-2'
                    onClick={() => {
                      PostComment()
                    }}
                  >
                    <span className=''>Bình luận</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className='d-flex  flex-grow-1 my-5'>
              <span className='text-gray'></span> Vui lòng đăng nhập để bình luận!
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const FaqDetailWrapper = () => {
  return (
    <>
      <FaqDetailPage />
    </>
  )
}

export {FaqDetailWrapper}
