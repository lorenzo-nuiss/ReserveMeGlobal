import axios from "axios";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(import.meta.env.VITE_API_URL + "/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.log("erreur lors de la connexion.");
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(phoneNumber: string, email: string, password: string) {
    return axios.post(import.meta.env.VITE_API_URL + "/signup", {
      phoneNumber,
      email,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
