import React from 'react'
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const InfoBox = ({title, cases, total}) => {
    return (
        <div className="stats">
            <Card>
                <CardContent>
                    <Typography color="textSecondary">{title}</Typography>
                    <Typography>+{cases}</Typography>
                    <Typography>{total}</Typography>
                </CardContent>
            </Card>
        </div>
      );
}
 
export default InfoBox;