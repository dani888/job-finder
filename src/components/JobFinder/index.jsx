import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
  },
  paper: {
      padding:10,
      "margin-top":10
  }
});

class JobFinder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12}>
        </Grid>
        <Grid item lg={3} xs={12}>
          <Paper className={classes.paper}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione veniam qui reiciendis fuga nihil aut tempore facere mollitia nesciunt dignissimos accusamus consequuntur quod, blanditiis provident perspiciatis minima, eius tenetur similique!</p>
            <Button variant="contained">Click Me!</Button>
          </Paper>
        </Grid>
        <Grid item lg={3} xs={12}>
          <Paper className={classes.paper}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error illum corporis placeat nemo repellat vero autem quo dolore impedit laboriosam, minima fuga reprehenderit explicabo eos perferendis velit dolor quia sunt?</p>
          </Paper>
        </Grid>
        <Grid item lg={3} xs={12}>
        </Grid>
      </Grid>
    );
  }
};

export default (withStyles(styles)(JobFinder));