import React, { SyntheticEvent } from 'react';

interface ButtonProps {
    onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
    text: string;
}

const Button = (props: ButtonProps) => {

    const {className, onClick, text} = props;

    return (
        <button
            onClick={onClick}
            className={className ? className : ''}
        >{text}</button>
    );
}

export default Button;