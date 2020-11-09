import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/workOrders";

function workOrderUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getWorkOrders() {
  return http.get(apiEndpoint);
}

export function getWorkOrder(workOrderId) {
  return http.get(workOrderUrl(workOrderId));
}

export function saveWorkOrder(workOrder) {
  if (workOrder._id) {
    const body = { ...workOrder };
    delete body._id;
    return http.put(workOrderUrl(workOrder._id), body);
  }

  return http.post(apiEndpoint, workOrder);
}
