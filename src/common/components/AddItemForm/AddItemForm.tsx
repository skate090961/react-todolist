import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import {IconButton, TextField} from "@mui/material"
import s from './AddItemForm.module.scss'

export type AddElementPropsType = {
    placeholder?: string
    onChange: (value: string) => void
    disabled?: boolean
}

const AddItemForm: React.FC<AddElementPropsType> = ({
                                                        onChange,
                                                        placeholder,
                                                        disabled = false
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

    const isMinLength = value.length === 0

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
                    disabled={disabled}
                />
                <IconButton
                    disabled={isMinLength}
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
        </div>
    )
}

export default React.memo(AddItemForm)