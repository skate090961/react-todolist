import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';

type InputPropsType = {
    value: string
    onChangeValue: (value: string) => void
    placeholder?: string
    isDisable?: (isDisable: boolean) => void
    onBlur?: boolean
}

const Input: React.FC<InputPropsType> = ({
                                             value,
                                             onChangeValue,
                                             placeholder,
                                             isDisable,
                                             onBlur
                                         }) => {
    useEffect(() => {
        isDisable && isDisable(minLength || maxLength)
    }, [value])

    const [error, setError] = useState<boolean>(false)

    const addElementHandler = () => {
        if (value.trim()) {
            onChangeValue(value)
            onChangeValue('')
        } else {
            setError(true)
        }
    }

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeValue(e.currentTarget.value)
        setError(false)
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addElementHandler()
    }

    const minLength = value.length === 0
    const maxLength = value.length > 30

    return (
        <div>
            <input
                value={value}
                onChange={changeInputHandler}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
            />
            {error && <div>Incorrect title</div>}
            {maxLength && <div>Title is too long</div>}
        </div>
    );
};

export default Input;