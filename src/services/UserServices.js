import axios from "axios";

class UserServices {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
  }
  getAllUsers() {
    return this.api.get("/users");
  }
  getUserByID(id) {
    return this.api.get("/users/" + id);
  }
  createNewUser(reqBody) {
    return this.api.post("/users", reqBody);
  }
  deletUserByID(id) {
    return this.api.delete("/users/" + id);
  }
  postMediaByArtistID(reqBody) {
    this.api.post("/media", reqBody);
  }
}
const userServices = new UserServices();
export default userServices;
