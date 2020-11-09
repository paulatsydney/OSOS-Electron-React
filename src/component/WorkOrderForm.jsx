import React from "react";
import Form from "./common/form";
import { saveWorkOrder } from "../services/workOrderService";

class WorkOrderForm extends Form {
  state = {
    data: {
      customer: "",
      vesselName: "",
      imo: "",
      equipBrandModel: "",
      workOrder: "",
      location: "",
      serialNumber: "",
      taskDescription: "",
      systemStatusOnArrival: "",
    },
    errors: {},
  };
  schema = {};

  doSubmit = async () => {
    await saveWorkOrder(this.state.data);

    this.props.history.push("/workOrders");
  };
  render() {
    return (
      <div>
        <h1 className="mb-3">Work Order Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("customer", "Customer")}
          {this.renderInput("vesselName", "Vessel Name")}
          {this.renderInput("imo", "IMO")}
          {this.renderInput("equipBrandModel", "Equip Brand Model")}
          {this.renderInput("workOrder", "Work Order")}
          {this.renderInput("location", "Location")}
          {this.renderInput("serialNumber", "Serial Number")}
          {this.renderInput("taskDescription", "Task Description")}
          {this.renderInput(
            "systemStatusOnArrival",
            "System Status On Arrival"
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default WorkOrderForm;
