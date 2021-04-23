import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Link, Fab } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons'
import MaterialTable from 'material-table';
import dayjs from 'dayjs';
const axios = require('axios');

const styles = theme => ({
  root: {
  },
  paper: {
      padding:10,
      "margin-top":10
  },
  table:{

  }
});

class JobFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading:false
    }
    this.init()
  }

  async init(){
    let response = await axios.get('http://localhost:8080/get-jobs')
    this.setState({data:response.data})
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12}>
          <MaterialTable className={classes.table}
            title="Job Finder"
            columns={[
            {
                title: 'Title',
                field: 'title'
            },
            {
              title: 'Seniority',
              field: 'seniority'
            },
            {
              title: 'Employment_Type',
              field: 'employment_type'
            },
            {
                title: 'URL',
                field: 'url',
                render: rowData => (<Link href={rowData.url} target="_blank">Job Page</Link>)
            },
            {
                title: 'Location',
                field: 'location'
            },
            {
                title: 'Posting Date',
                field: 'posting_date'
            }]}
            data={this.state.data}
            isLoading={this.state.isLoading}
            options={{
                search: true,
                sorting: true,
                filtering: true,
                paging: true,
                exportButton: true,
                selection: true
            }}>
        </MaterialTable>
        </Grid>
      </Grid>
    );
  }
};

export default (withStyles(styles)(JobFinder));