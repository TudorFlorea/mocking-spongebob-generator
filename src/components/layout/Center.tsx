import React from 'react';

interface CenterProps {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

const Center = (props: CenterProps) => {
    const {children, className} = props;

    return (
        <div className={`center ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default Center;