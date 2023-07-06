import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import sofa1 from "../assets/sofa1.1.jpg";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  const { catData } = props;
  
  return (
    <>
      <Card sx={{ maxWidth: 345 }} catData={catData}>
        <CardActionArea>
          <Link to={`/product/${catData?.slug}`}>
            <CardMedia
              component="img"
              style={{ height: "208px", objectFit: "contain" }}
              image={catData?.images[0]?.url}
              alt={catData?.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                className="text-center"
                component="div"
              >
                {catData?.title}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CategoryCard;
