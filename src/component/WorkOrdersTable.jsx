import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class WorkOrdersTable extends Component {
  columns = [
    {
      path: "workOrder",
      label: "Work Order",
      content: (workOrder) => (
        <Link to={`/workOrders/${workOrder._id}`}>{workOrder.workOrder}</Link>
      ),
    },
    { path: "customer", label: "Customer" },
    { path: "vesselName", label: "Vessel Name" },
    { path: "imo", label: "IMO" },
    { path: "equipBrandModel", label: "Equip Brand Model" },
    { path: "location", label: "Location" },
    { path: "serialNumber", label: "Serial Number" },
    { path: "taskDescription", label: "Task Description" },
    { path: "systemStatusOnArrival", label: "System Status On Arrival" },
  ];

  render() {
    const { workOrders } = this.props;

    return <Table columns={this.columns} data={workOrders} />;
  }
}

export default WorkOrdersTable;
