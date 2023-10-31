import {Grid} from "@mui/material";

export const TodoListContainerDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                {storyFn()}
            </Grid>
        </Grid>
    )
}