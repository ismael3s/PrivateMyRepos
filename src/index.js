import { gitAxios } from "./api/axios.js";
import gitCredentials from "./config/gitCredentials.js";

const sleep = (miliseconds = 1000) =>
  new Promise((resolve) => setTimeout(resolve, miliseconds));

const { data } = await gitAxios.get("/user/repos");

const publicRepositories = data
  .map(({ visibility, name, html_url }) => ({
    visibility,
    name,
    url: html_url,
  }))
  .filter(
    ({ visibility, url }) =>
      visibility === "public" && url.includes(gitCredentials.auth.username)
  );

publicRepositories.forEach(async ({ name }) => {
  await sleep(2000);

  const payload = {
    visibility: "private",
  };

  await gitAxios.patch(`repos/ismael3s/${name}`, payload);
});
