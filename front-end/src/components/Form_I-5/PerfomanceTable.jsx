import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// import UserTextField from './UserTextField';
import RadioCustom from './RadioCustom';
import { TextField } from '@material-ui/core';

import { connect } from 'react-redux';
import { submitPerformanceLevel } from '../../actions/formI5Performance-actions';
import { compose } from 'redux';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      hover: true,
      width: '300px',
    },
  },
});

let id = 0;
function createData(name, performance, comments) {
  id += 1;
  return { id, name, performance, comments };
}


const rows = [
    createData('Volume of work'),
    createData('Quality of Work'),
    createData('Analytical ability'),
    createData('Ability to resolve problems'),
    createData('Accuracy and thoroughness'),
    createData('Ability to work under pressure'),
    createData('Oral communications'),
    createData('Written communications'),
    createData('Original and critical thinking'),
    createData('Ability to learn'),
  ];

class PerformanceTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        performanceTableData :[],
    };
  }
  HandleRadio = (e,perfID) => {
    
    let tempState = this.state.performanceTableData;
    let status = false;
    if(this.state.performanceTableData.length === 0) {
      let performanceObj = {
        id : perfID,
        level : e.target.value,
        comment : null
      }
      tempState.push(performanceObj);
    } else {
      tempState.map (x => {
          if(x.id === perfID) {
            x.level = e.target.value
            status = true;  
          }
          return x;
      });
      if(!status) {
        let performanceObj = {
          id : perfID,
          level : e.target.value,
          comment : null
        }
        tempState.push(performanceObj);
      }
    }
    this.setState({
      performanceTableData:tempState
    });
    console.log(this.state);
    e.preventDefault();
  }

  handle(name) {
    console.log('name', name);
  }

  validateField() {
    let check = false;
    this.state.performanceTableData.forEach(x => {
      if(this.state.performanceTableData.length !== 10 || x.level === null 
        || x.comment === null) {
        check = false;
      } else {
        check = true;
      }
    });

    if(check) {
      this.props.submitPerformanceLevel(this.state.performanceTableData);
      this.props.clickNext();
    } else {
      alert('Fill the out the form');
    }
  }
  
  handleBack() {
    if(true) {
      this.props.clickBack();
    }
  }

  handleText = (e) => {
    // console.log([e.target.id]+ "  " + e.target.value);
    let status = false;
    if(this.state.performanceTableData.length === 0) {
      let perObj = {
        id: e.target.id,
        comment: e.target.value,
        level: null,
      }
      this.state.performanceTableData.push(perObj);
    } else {
      this.state.performanceTableData.map (x => {
        if(x.id === e.target.id) {
          x.comment = e.target.value
          status = true;
        }
        return x;
      });
      if(!status){
        let perObj = {
          id : e.target.id,
          level: null,
          comment: e.target.value,
        }
        this.state.performanceTableData.push(perObj);
      }
    }
    // console.log(this.state);
    e.preventDefault();
  }

  render () {
    const { classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell >Category</CustomTableCell>
            <CustomTableCell >Performance</CustomTableCell>
            <CustomTableCell >Comments, Examples, Observations</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}  
                </CustomTableCell>
                {/* <CustomTableCell ><RadioCustom perfId={row.name} onChange={() => { this.handle(row.name); } }/></CustomTableCell> */}
                <CustomTableCell ><RadioCustom perfId={row.name} onChange={this.HandleRadio }/></CustomTableCell>
                <CustomTableCell ><TextField fullWidth={true} label={"Comments"} id={row.name} onChange={this.handleText}/></CustomTableCell>
                {/* <CustomTableCell ></CustomTableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <br />
      <div>
        <Button
          disabled={this.props.actiStep === 0}
          onClick={this.handleBack.bind(this)}
          className={classes.backButton}
        >
          Back
        </Button>
        <label></label>&nbsp;<label> </label>
        <Button variant="contained" color="primary" onClick={this.validateField.bind(this)}>
                    Next
        </Button>
        <br />
        <p> </p>
      </ div>
    </Paper>
  );
  }
}

PerformanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({

})

// export default withStyles(styles)(PerformanceTable);
export default compose(
  withStyles(styles),
  connect(mapStateToProps, {submitPerformanceLevel}),
)(PerformanceTable);