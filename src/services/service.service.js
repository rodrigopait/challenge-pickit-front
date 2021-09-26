import { requests } from "../../utils/requestHandler";

export const ServiceService = {
  getAll: () => requests.get(`/service`),
};
