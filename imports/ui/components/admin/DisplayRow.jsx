import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import DisplayTableCell from "./DisplayTableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';


class DisplayRow extends Component {

  state = {
    selected:[]
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id=> this.state.selected.indexOf(id)!==-1;

  render() {
    const { row, align, isEditable, userId, onApprove, onReject, name} = this.props;
    // console.log(row);
    const selected = this.isSelected(row.id);
    const keys = Object.keys(row).filter(key => key !== "id");


    console.log(this.props)
    return (
      <TableRow hover role="checkbox" aria-checked={selected} key={row.key} selected={selected}>
        {!isEditable && <TableCell align={align}></TableCell>}
        {isEditable && 
        <TableCell>
          {/* <Checkbox checked={selected}
                    onClick={event => this.handleClick(event, row.id)}/> */}
            <Button>
              <Done onClick={()=> onApprove(userId,name)} color='secondary'/>
            </Button>
            <Button>
              <Close onClick={()=> onReject(userId,name)} color='secondary'/>
            </Button>       
        </TableCell>}
        {keys.map(key=> (
          <DisplayTableCell key={key} cellValue={row[key]} align={align || "center"}/>
        ))}
      </TableRow>


    )
      ;
  }
}

export default DisplayRow;
