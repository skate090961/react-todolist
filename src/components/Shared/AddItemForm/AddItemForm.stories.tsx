import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AddItemForm, {AddElementPropsType} from "./AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./AddItemForm.module.scss";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            description: 'Button clicked inside form',
            action: 'Button clicked inside form'
        },
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {}

const ErrorAddItemForm: React.FC<AddElementPropsType> = React.memo(({
                                                                        onChange,
                                                                        placeholder
                                                                    }) => {
    const [value, setValue] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(true)
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
})

export const ErrorAddItemFormStory = () => {
    return <ErrorAddItemForm onChange={action('Button clicked inside form')}/>
}

