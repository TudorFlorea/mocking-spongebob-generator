import React, { ChangeEvent } from 'react';

interface UTextAreaProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

const UTextArea = (props: UTextAreaProps) => {

    const {className, onChange} = props;

    return (
        <textarea onChange={onChange} className={className ? className : ''}></textarea>
    );
}

export default UTextArea;