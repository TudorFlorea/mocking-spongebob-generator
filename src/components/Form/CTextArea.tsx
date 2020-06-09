import React, { ChangeEvent } from 'react';

interface CTextAreaProps {
    value: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    disabled?: boolean;
}

const CTextArea = (props: CTextAreaProps) => {
    const {value, className, onChange, disabled} = props;

    return (
    <textarea 
        className={className ? className : ''}
        onChange={onChange}
        value={value}
        disabled={disabled ? true : false}
    ></textarea>
    )
};

export default CTextArea;