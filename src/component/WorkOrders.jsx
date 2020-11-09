import React, { Component } from "react";
import WorkOrdersTable from "./WorkOrdersTable";
import { getWorkOrders } from "../services/workOrderService";

class WorkOrders extends Component {
  state = {
    workOrders: [],
  };

  async componentDidMount() {
    const { data: workOrders } = await getWorkOrders();
    this.setState({ workOrders });
  }

  render() {
    return (
      <div>
        <h1 className="mb-3">Work Orders List</h1>
        <WorkOrdersTable workOrders={this.state.workOrders} />
      </div>
    );
  }
}

export default WorkOrders;
