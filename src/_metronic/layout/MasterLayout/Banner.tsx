import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import Particles from 'react-tsparticles'

import { BannerConfig } from 'src/models'
import { setCategoryId } from 'src/setup/redux/dataset/Slice'
import { categoryApi } from 'src/app/apis'
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import { useDispatch } from 'react-redux'
import { bannerConfigApi } from 'src/app/apis/bannerConfig'

const Banner = () => {
    const dispatch = useDispatch()

    const [listCategory, setListCategory] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [bannerConfig, setBannerConfig] = useState<BannerConfig | undefined>()

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await categoryApi.getAll()
            setListCategory(res?.data ?? [])
        }

        const fetchBannerConfig = async () => {
            const res = await bannerConfigApi.get()
            setBannerConfig(res?.data)
        }

        fetchCategory()
        fetchBannerConfig()
    }, [])

    const handleClickCategory = (id: string) => {
        dispatch(setCategoryId(id))
    }

    const responseCarousel = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 7,
            partialVisibilityGutter: 40
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 2,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 4,
            partialVisibilityGutter: 30
        }
    }

    return (
        <div className='main-banner' style={{ backgroundImage: `url(${toAbsoluteUrl('media/images/bg-slide.png')})` }}>
            <div className='container'>
                <div className='form-search'>
                    <div className='form-search-text text-center'>
                        <p>{bannerConfig?.line1}</p>
                        <p>{bannerConfig?.line2}</p>
                    </div>
                    <div className='form-search-input mb-5 mb-md-8'>
                        <div className='input-group mb-5'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Bạn muốn tìm kiếm dữ liệu gì ?'
                                aria-label='Bạn muốn tìm kiếm dữ liệu gì ?'
                                aria-describedby='search-addon2'
                                onChange={(event) => { setInputValue(event?.target?.value ?? '') }}
                            />
                            <Link
                                to={`/du-lieu?search=${inputValue}`}
                                className='btn btn-search input-group-text'
                                id='search-addon2'>
                                <span className='fa fa-search'></span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='group-catergory'>
                    <Carousel
                        additionalTransfrom={0}
                        arrows={false}
                        autoPlay
                        autoPlaySpeed={6000}
                        centerMode={false}
                        draggable={false}
                        focusOnSelect={false}
                        infinite
                        keyBoardControl={false}
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={responseCarousel}
                        showDots={true}
                        slidesToSlide={1}
                        swipeable
                    >
                        {listCategory.map((i: any) => (
                            <div
                                className='item-category text-center'
                                key={i.id}
                                onClick={() => handleClickCategory(i.id)}
                                title={i?.name ?? ''}
                            >
                                <div className='item-category_thumb'>
                                    <Link to={`/Du-lieu/${i.id}`} key={`link-${i.id}`}>
                                        <img src={i.imageUrl
                                            ? `${process.env.REACT_APP_FILE_URL}/${i.imageUrl}`
                                            : ''}
                                            alt='' />
                                    </Link>
                                </div>
                            </div>
                        )
                        )}
                    </Carousel>
                </div>
            </div>
            <div className='star-parallax'>

                <Particles
                    id='bannerParticles'
                    options={{
                        fpsLimit: 60,
                        particles: {
                            links: {
                                enable: true,
                                distance: 100
                            },
                            move: {
                                enable: true,
                                speed: 2,
                                outModes: {
                                    default: 'bounce'
                                }
                            },
                            size: {
                                value: 3
                            }
                        }
                    }}
                />

                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
            </div>
        </div>
    )
}

export default Banner
