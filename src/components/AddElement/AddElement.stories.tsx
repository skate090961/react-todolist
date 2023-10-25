import AddElement from "./AddElement";
import { action } from '@storybook/addon-actions'

export default {
    title: 'AddElement Component',
    component: AddElement,
}

const callback = action("Button 'add' was pressed inside the form")

export const AddElementBaseExample = (props: any) => {
    return <AddElement onChange={callback}/>
}