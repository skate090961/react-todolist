import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {IconButton, TextField} from "@mui/material";
import s from './AddElement.module.scss'

type AddElementPropsType = {
    placeholder?: string
    onChange: (value: string) => void
}

const AddElement: React.FC<AddElementPropsType> = ({
                                                       onChange,
                                                       placeholder
                                                   }) => {
    const [value, setValue] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false)
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setIsError(false)
    }
    const addElementHandler = () => {
        if (value.trim()) {
            onChange(value)
            setValue('')
        } else {
            setIsError(true)
        }
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addElementHandler()
    }

    const minLength = value.length === 0
    const maxLength = value.length > 30
    const isDisableButton = minLength || maxLength

    return (
        <div>
            <div className={s.root}>
                <TextField
                    error={isError}
                    variant="outlined"
                    size={"small"}

                    value={value}
                    onChange={changeInputHandler}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                />
                <IconButton
                    disabled={isDisableButton}
                    onClick={addElementHandler}
                    color={"primary"}
                    size={"large"}
                >
                    <AddBoxIcon style={{fontSize: 30}}/>
                </IconButton>
            </div>
            {
                isError && <span className={s.error_text}>Incorrect title</span>
            }
            {
                maxLength && <span className={s.error_text}>Title is too long</span>
            }
        </div>
    )
        ;
};

export default AddElement;