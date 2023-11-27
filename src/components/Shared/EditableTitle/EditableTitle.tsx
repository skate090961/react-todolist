import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from "@mui/material"
import s from './EditableTitle.module.scss'

type EditableTitlePropsType = {
    title: string
    onChangeTitle: (title: string) => void
    disabled?: boolean
}

const EditableTitle: React.FC<EditableTitlePropsType> = ({
                                                             title,
                                                             onChangeTitle,
                                                             disabled
                                                         }) => {
    const [value, setValue] = useState<string>(title)
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false)

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const isShowEditHandler = () => {
        if (disabled) {
            return
        }
        setIsShowEdit(!isShowEdit)
    }
    const addTitleHandler = () => {
        isShowEditHandler()
        onChangeTitle(value)
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTitleHandler()
    }

    return (
        <div className={s.root}>
            {
                isShowEdit
                    ? <TextField
                        variant={'standard'}
                        value={value}
                        onChange={changeInputHandler}
                        onBlur={addTitleHandler}
                        onKeyDown={handleKeyPress}
                        autoFocus
                    />
                    : <span onDoubleClick={isShowEditHandler}>{title}</span>
            }
        </div>
    );
};

export default React.memo(EditableTitle)