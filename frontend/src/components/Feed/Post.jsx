import * as React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography
} from "@mui/material";
import JwtService from "../../client/jwt.service";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {styled} from '@mui/material/styles';
import {Comments} from "./Comments";

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Post = ({post}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {email} = JwtService.getCurrentTokenPayload();

  return (
    <Card sx={{maxWidth: 645}}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: "orange"
            }}
            aria-label="recipe"
          >
            {email && email[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={post.title}
        subheader={post.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

      </CardActions>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <Comments
            postId={post.id}
          />
        </CardContent>
    </Card>
  )
}