import { requests } from "../../utils/requestHandler";

export const CarServiceService = {
  getAll: () => requests.get("/carService"),
  save: (carService) => requests.post("/carService", carService),
};
