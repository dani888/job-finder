import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Link, Fab } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons'
import MaterialTable from 'material-table';
import dayjs from 'dayjs';

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
      data: [
        {
          id:"d8e025b9-9465-4e95-b951-e65b7294f1c3",
          title:"hello",
          seniority:"Entry Level",
          url:"https://www.google.com",
          date: dayjs().format(),
          liked: false
        },
        {
          id:"5994a83c-64ef-44a1-9f06-968d08d6c3a6",
          title:"hello",
          seniority:"Entry Level",
          url:"https://www.google.com",
          date: dayjs().format(),
          liked: false
        },
        {
          id:"a2eaefcb-3cec-491c-bc90-fc2fe3fc04bc",
          title:"hello",
          seniority:"Assosiate",
          url:"https://www.google.com",
          date: dayjs().format(),
          liked: true
        },
        {
          id:"54dba544-f833-4905-8108-8836228dd9e8",
          title:"hello",
          seniority:"Mid Senior",
          url:"https://www.google.com",
          date: dayjs().format(),
          liked: false
        }
      ],
      isLoading:false
    }
  }

  updateFav(id){
    this.setState(this.state.data.map(row=>{
      if(row.id == id){
        row.liked = !row.liked
      }
      return row
    }))
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
                title: 'URL',
                field: 'url',
                render: rowData => (<Link href={rowData.url} target="_blank">{rowData.url}</Link>)
            },
            {
                title: 'Posting Date',
                field: 'date'
            },
            {
                title: 'Like',
                field: 'liked',
                render: rowData => (<Fab color="primary" aria-label="add" onClick={e=>this.updateFav(rowData.id)}>{rowData.liked ? <Favorite/> : <FavoriteBorder/>}</Fab>)
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