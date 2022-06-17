import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

interface AccountItemProps {
    icon?: string,
    content?: any,
    borderTop?: boolean,
    to: string,
}

const AccountItem: React.FC<AccountItemProps> = ({ icon, content, borderTop = false, to }) => {
    return (
        <div className={cx(
            'wrapper',
            {
                'border-top': borderTop
            },
        )}>
            <Link to={to} className={cx('info')}>
                <i className={icon}></i>
                <span className={cx('name')}>{content}</span>
            </Link>
        </div>
    );
}

export default AccountItem;