import React, { ChangeEvent } from 'react';

interface RadioProps {
    id: string;
    name: string;
    label: string;
    checked?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = (props: RadioProps) => {
    const {id, name, label, checked, onChange} = props;

    return (
        <label htmlFor={id} className={`radio ${checked ? "radio--checked" : ""}`}>
            <input checked={checked} onChange={onChange} type="radio" name={name} id={id} className="hidden radio__input"/>
            <span className="radio__label"></span>{label}
        </label>
    );
};

export default Radio;