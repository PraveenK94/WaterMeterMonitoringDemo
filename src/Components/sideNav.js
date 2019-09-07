import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { mainListItems, secondaryListItems } from "./listItems";

export default class Sidnav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  togleNav = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <Drawer variant="permanent" open={this.open}>
        <div>
          <IconButton>
            <ChevronLeftIcon onClick={this.togleNav} />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    );
  }
}
