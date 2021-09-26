import { requests } from "../../utils/requestHandler";

export const CarService = {
  getAll: () => requests.get("/car"),
  getById: (id) => requests.get(`/car/${id}`),
  save: (car) => requests.post("/car", car),
  update: (editedCarId, editedCarData) =>
    requests.put(`/car/${editedCarId}`, editedCarData),
  delete: (id) => requests.delete(`/car/${id}`),
};
