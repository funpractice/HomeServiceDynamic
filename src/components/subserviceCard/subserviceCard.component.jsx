import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./subserviceCard.styles.css";
import MyVerticallyCenteredModal from '../subServiceModal/subServiceModel.component'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function addtocart(subserviceId){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("subservice_id", subserviceId);
  urlencoded.append("customer_id", "1");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("http://localhost:4000/api/AddToCart", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result);
    
  })
  .catch(error => console.log('error', error));
};

export default function SubserviceCard({sub_servicename,short_description,price,time_duration,image, long_description,service_name,subserviceId}) {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [cart, setCart] = useState(false);


console.log(subserviceId)

  return (
  <div className='subServiceCard'>
    <Card className={classes.root, 'card'}>
      <CardActionArea onClick={() => setModalShow(true)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography  gutterBottom variant="h5" component="h2">
          {sub_servicename}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {short_description}
          </Typography>
          <Typography className="spanTag" variant="body2" color="textSecondary" display="inline">
            <span className='price'>₹{price}</span><span>Duration: {time_duration}</span>
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions className="baton">
        {cart
        ?
        "Added" 
        :
        <Button size="small" className="baton" onClick={(e)=>{addtocart(subserviceId); setCart(true)}}>
          Add to Cart
        </Button>}
        <Button size="small"  className="baton" onClick={() => setModalShow(true)}>
          View More
        </Button>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        long_description={long_description}
        sub_servicename={sub_servicename}
        service_name={service_name}
      />
      </CardActions>
    </Card>
    </div>
  );
}