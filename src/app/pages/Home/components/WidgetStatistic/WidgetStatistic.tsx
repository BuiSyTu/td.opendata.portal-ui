import { Link } from 'react-router-dom'

import { toAbsoluteUrl } from 'src/_metronic/helpers'

interface WidgetStatisticProps {
    slug?: string,
    name: string,
    count: any,
    imageUrl?: string,
}

const WidgetStatistic: React.FC<WidgetStatisticProps> = ({
    slug,
    name,
    count,
    imageUrl,
}) => {
    return (
        <div className="card shadow-sm">
            {slug
                ? (
                    <Link to={slug}>
                        <div className="card-body p-4">
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-start flex-column'>
                                    <h4 className='text-gray-800 fw-bold fs-5'>{name}</h4>
                                    <h3 className='m-0 text-danger fs-1'>{count}</h3>
                                </div>
                                <div className="statistical-thumb">
                                    <img src={imageUrl} className="w-60px" alt="" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="card-body p-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-start flex-column'>
                                <h4 className='text-gray-800 fw-bold fs-5'>{name}</h4>
                                <h3 className='m-0 text-danger fs-1'>{count}</h3>
                            </div>
                            <div className="statistical-thumb">
                                <img src={imageUrl} className="w-60px" alt="" />
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default WidgetStatistic