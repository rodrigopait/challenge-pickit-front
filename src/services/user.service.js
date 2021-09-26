import { requests } from "../../utils/requestHandler";

export const UserService = {
  getAll: () => requests.get(`/user`),
  save: (user) => requests.post(`/user`, user),
};
