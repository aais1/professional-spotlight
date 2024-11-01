import axios from "axios";

async function sendRequest(method,url,body = null) {
  const token = localStorage.getItem("token");
  console.log("token",token);
  try {
    const response = await axios({
      method: method,
      url:"https://professional-spotlight-backend-beta.vercel.app"+url,

      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: body == null || body == undefined ? null : JSON.stringify(body),
    });
    if (response?.status !== 200) {
      if (response?.data?.message === "Invalid token") {
        return response?.data?.message;
      }
 
      return response;
    }
 console.log(response?.data);
    if (response?.data?.token) {
      localStorage.setItem("token", response?.data?.token);
    }
    return response?.data;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}
export default sendRequest;
