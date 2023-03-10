import axios from "axios";
import "normalize.css";
import "./style";
import "./style/img";
const oBtn1 = document.createElement("button");
const oBtn2 = document.createElement("button");
oBtn1.textContent = "头部";
oBtn2.textContent = "底部";
async function handleClick(text) {
  let result = await import(`./router/${text}`);
  console.log(result.default);
  axios.get("https://api.vvhan.com/api/acgimg?type=json").then((res) => {
    const oImg = document.createElement("img");
    oImg.src = res.data?.imgurl;
    document.body.appendChild(oImg);
  });
}
function getImg() {
  axios.get("https://api.vvhan.com/api/acgimg?type=json").then((res) => {
    const oImg = document.createElement("img");
    oImg.src = res.data?.imgurl;
    document.body.appendChild(oImg);
  });
}
oBtn1.addEventListener("click", async function () {
  let result = await import(
    /* webpackChunkName: "header" */
    /* webpackPrefetch: true */ //预获取
    `./router/header`
  );
  console.log(result.default);
  getImg();
});
oBtn2.addEventListener("click", async function () {
  let result = await import(
    /* webpackChunkName: "footer" */
    /* webpackPreload: true */ //预加载
    `./router/footer`
  );
  console.log(result.default);
  getImg();
});
document.body.append(oBtn1, oBtn2);
