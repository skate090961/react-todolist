import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddElementPropsType = {
    placeholder?: string
    onChange: (value: string) => void
}

const AddElement: React.FC<AddElementPropsType> = ({
                                                       onChange,
                                                       placeholder
                                                   }) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }
    const addElementHandler = () => {
        if (value.trim()) {
            onChange(value)
            setValue('')
        } else {
            setError(true)
        }
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addElementHandler()
    }

    const minLength = value.length === 0
    const maxLength = value.length > 30
    const isDisableButton = minLength || maxLength

    return (
        <>
            <div>
                <input
                    value={value}
                    onChange={changeInputHandler}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                />
                <button
                    disabled={isDisableButton}
                    onClick={addElementHandler}
                >+</button>
            </div>
            {error && <div>Incorrect title</div>}
            {maxLength && <div>Title is too long</div>}
        </>
    );
};

export default AddElement;