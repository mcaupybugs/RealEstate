import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 2 * (window.innerWidth) / 5,
    },
    media: {
        height: window.innerHeight,
    },
    button: {
        position: "absolute",
        bottom: 12
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={require('../assets/images/building.jpeg')}
                    title="Contemplative Reptile"
                >
                    <CardContent>
                        <Typography align="center" fontFamily="Apple Color Emoji" variant="h1" component="h2">
                            Home Seva
                    </Typography>
                        <Typography variant="body2" align="center" component="p">
                            Write your selling line here
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="medium" variant="contained" color="primary">
                            Source on GitHub
                        </Button>
                    </CardActions>
                </CardMedia>

            </CardActionArea>
        </Card>
    );
}