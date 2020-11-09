import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import http from "../services/httpService";
import Form from "./common/form";

import { getWorkOrder } from "../services/workOrderService";

class WorkOrderDetails extends Form {
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
      tempfrom: "",
      tempto: "",
      tempcomments: "",
    },
    detailActivity: [],
    errors: {},
    info: "",
    showInputForm: false,
  };

  mapToViewModel(workOrder) {
    return {
      _id: workOrder._id,
      customer: workOrder.customer,
      vesselName: workOrder.vesselName,
      imo: workOrder.imo,
      equipBrandModel: workOrder.equipBrandModel,
      workOrder: workOrder.workOrder,
      location: workOrder.location,
      serialNumber: workOrder.serialNumber,
      taskDescription: workOrder.taskDescription,
      systemStatusOnArrival: workOrder.systemStatusOnArrival,
    };
  }

  async componentDidMount() {
    await this.populateWorkOrder();
  }

  handleSyncSAP() {
    alert("Simulate updating SAP system, call SAP API");
  }

  async populateWorkOrder() {
    try {
      const workOrderId = this.props.match.params.id;
      if (workOrderId === "new") return;

      const { data: workOrder } = await getWorkOrder(workOrderId);
      this.setState({ data: this.mapToViewModel(workOrder) });
      console.log("Get object: ", this.mapToViewModel(workOrder));
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  handleGeneratePDF = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  handleTestConnection = async () => {
    let res;
    try {
      res = await http.get("https://jsonplaceholder.typicode.com/todos/1");
    } catch (error) {
      console.log(error);
      this.setState({
        info: "Can't connect to SAP system, please sync later.",
      });
      return null;
    }
    console.log(res);
    this.setState({
      info: "You can connect to SAP system, press Sync button to upload data.",
    });
    return res;
  };

  checkButtonDisability = () => {
    if (
      this.state.info ===
      "You can connect to SAP system, press Sync button to upload data."
    ) {
      return false;
    }
    return true;
  };

  renderTable() {
    if (this.state.detailActivity.length === 0) {
      return null;
    }

    console.log("render table:", this.state.detailActivity);

    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Comments</th>
          </tr>
        </thead>
        <tbody>
          {this.state.detailActivity.map((item) => (
            <tr key={item.from}>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{item.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  doSubmit = async () => {
    const newObj = {
      from: this.state.data.tempfrom,
      to: this.state.data.tempto,
      comments: this.state.data.tempcomments,
    };
    this.setState({ showInputForm: false });
    this.setState({
      detailActivity: [...this.state.detailActivity, newObj],
    });
  };

  handleAddActivity = () => {
    this.setState({ showInputForm: true });
  };

  render() {
    return (
      <div>
        <div id="capture">
          <h1 className="mb-3">Work Order Details</h1>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Customer:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.customer}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Vessel Name:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.vesselName}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              IMO:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.imo}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Equip Brand Model:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.equipBrandModel}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Work Order:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.workOrder}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Location:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.location}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Serial Number:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.serialNumber}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-sm-2 col-form-label col-form-label-lg">
              Task Description:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.taskDescription}
            </label>
          </div>
          <div className="form-group">
            <label className="col-sm-3 col-form-label col-form-label-lg">
              System Status On Arrival:
            </label>
            <label className="col-sm-2 col-form-label col-form-label-lg">
              {this.state.data.systemStatusOnArrival}
            </label>
          </div>
        </div>
        <div>{this.renderTable()}</div>
        <div hidden={!this.state.showInputForm}>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("tempfrom", "From")}
            {this.renderInput("tempto", "To")}
            {this.renderInput("tempcomments", "Comments")}
            {this.renderButton("Save")}
          </form>
        </div>
        <div>
          <button
            class="p-3 m-3 btn btn-primary mh-3"
            onClick={this.handleAddActivity}
          >
            Add detail activity
          </button>
          <button
            class="p-3 m-3 btn btn-primary"
            onClick={this.handleGeneratePDF}
          >
            Generate PDF
          </button>
          <button
            class="p-3 m-3 btn btn-primary mh-3"
            onClick={this.handleTestConnection}
          >
            Test SAP connection
          </button>
          <button
            disabled={this.checkButtonDisability()}
            class="p-3 m-3 btn btn-primary"
            onClick={this.handleSyncSAP}
          >
            Sync with SAP
          </button>
        </div>
        <div className="mt-3 col-form-label-lg">{this.state.info}</div>
      </div>
    );
  }
}

export default WorkOrderDetails;
