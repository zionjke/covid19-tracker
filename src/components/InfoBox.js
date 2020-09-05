import * as React from 'react';
import '../scss/InfoBox.scss'
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";

const InfoBox = ({title,cases,total,}) => {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography className="indobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infobox__cases">{cases}</h2>
                <Typography className="infobox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    );
};

export default InfoBox