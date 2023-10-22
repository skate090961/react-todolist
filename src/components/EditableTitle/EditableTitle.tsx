import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableTitlePropsType = {
    title: string
    onChangeTitle: (title: string) => void
}

const EditableTitle: React.FC<EditableTitlePropsType> = ({
                                                             title,
                                                             onChangeTitle
                                                         }) => {
    const [value, setValue] = useState<string>(title)
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false)

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const isShowEditHandler = () => {
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
        <div>
            {
                isShowEdit
                    ? <input
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

export default EditableTitle;