import * as React from 'react';
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";

const InfoBox = ({title,cases,total,}) => {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="indoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    );
};

export default InfoBox