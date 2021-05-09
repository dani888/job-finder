import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Link, Fab } from '@material-ui/core';
import { FavoriteBorder, Favorite, Star, StarOutline, ThumbDown, ThumbDownOutlined} from '@material-ui/icons'
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

  async toggleTag(jobId, active, tag){
    let params = {
      params: {
        tag: tag,
        isSelected: active,
        jobId:jobId
      }
    }
    await axios.get('http://localhost:8080/update-tag',params)

    //get index of row with job id
    let index = 0;
    this.state.data.map((row,i)=>{
      if (row.id == jobId) {
        index = i
      }
    })
    //get row with job id
    let [rowData] = this.state.data.filter(row=>row.id == jobId)
    //get all other rows
    let otherRowData = this.state.data.filter(row=>row.id != jobId)
    //modify row with job id
    rowData[tag] = active ? "TRUE" : "FALSE"
    //add modified row back to other rows
    otherRowData.splice(index, 0, rowData)
    //set new state
    this.setState({
      data: otherRowData
    })
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
                
            },
            {
                title: 'liked',
                field: 'liked',
                render: rowData => (rowData.liked == 'TRUE' ? <Favorite onClick={()=>this.toggleTag(rowData.id, false, 'liked')} /> : <FavoriteBorder onClick={()=>this.toggleTag(rowData.id, true, 'liked')} /> )
            },
            {
                title: 'applied',
                field: 'applied',
                render: rowData => (rowData.applied == 'TRUE' ? <Star onClick={()=>this.toggleTag(rowData.id, false, 'applied')} /> : <StarOutline onClick={()=>this.toggleTag(rowData.id, true, 'applied')} /> )
            },
            {
                title: 'passed',
                field: 'passed',
                render: rowData => (rowData.passed == 'TRUE' ? <ThumbDown onClick={()=>this.toggleTag(rowData.id, false, 'passed')} /> : <ThumbDownOutlined onClick={()=>this.toggleTag(rowData.id, true, 'passed')} /> )
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