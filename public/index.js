var Balendatas = [];
var Kesabdatas = [];
var Srijanadatas = [];
var Sumandatas = [];
var Madandatas = [];
var Candidates = [];
var Votes = [];
var img_jpg = document.getElementById("jpg-export");

const getData = async () => {
  res = await fetch("http://localhost:3000/api/v1/data").catch((err) =>
    console.log(err)
  );
  // res = await fetch('http://localhost:3000/api/v1/data').catch(err => console.log(err))

  // res = await fetch('http://localhost:3000/api/v1/data')
  // console.log(res);

  resj = await res.json();
  // console.log(resj);

  resj.forEach((e, i) => {
    // Balendatas.push(e.data.find((data)=>data.name=="Balendra Shah").votes)
    // Balendatas.push(e.data.find((data)=>data.name=="Balendra Shah").votes)
    // Balendatas.push(e.data.find((data)=>data.name=="Balendra Shah").votes)
    // Balendatas.push(e.data.find((data)=>data.name=="Balendra Shah").votes)
    // Balendatas.push(e.data.find((data)=>data.name=="Balendra Shah").votes)

    Balendatas.push(
      e.data.find((mydata) => mydata.name == "Balendra Shah").votes
    );
    Kesabdatas.push(
      e.data.find((mydata) => mydata.name == "Keshav Sthapit").votes
    );
    Srijanadatas.push(
      e.data.find((mydata) => mydata.name == "Shirjana Shrestha").votes
    );
    Madandatas.push(
      e.data.find((mydata) => mydata.name == "Madan Das Shrestha").votes
    );
    Sumandatas.push(
      e.data.find((mydata) => mydata.name == "Suman Sayami").votes
    );
  });
  console.log(Candidates, Votes);
};

const sendImg = async (options) => {
  fetch(`/api/v1/postimage`, options).catch((err) => {
    console.log(err);
  });
};

const fillMaps = async () => {
  document.getElementById("gd").innerHTML = "<h1> LOADING.... </h1>";
  await getData();

  var BalendraShah = {
    y: Balendatas,
    name: `Balendra shah - <b>${Balendatas[Balendatas.length - 1]}</b>`,
    votes: Balendatas[Balendatas.length - 1],

    // text : Balendatas[Balendatas.length - 1]
  };
  var KesabSthapit = {
    y: Kesabdatas,
    name: `Keshab Sthapit - <b>${Kesabdatas[Kesabdatas.length - 1]}</b>`,
    votes: Kesabdatas[Kesabdatas.length - 1],
    // text : Kesabdatas[Kesabdatas.length - 1]
  };
  var SrijanaShrestha = {
    y: Srijanadatas,
    name: `Srijana Shrestha - <b>${Srijanadatas[Srijanadatas.length - 1]}</b>`,
    votes: Srijanadatas[Srijanadatas.length - 1],
    // text : Srijanadatas[Srijanadatas.length - 1]
  };
  var SumanSayami = {
    y: Sumandatas,
    name: `Suman Sayami - <b>${Sumandatas[Sumandatas.length - 1]}</b>`,
    votes: Sumandatas[Sumandatas.length - 1],
  };
  var MandanDasSharestha = {
    y: Madandatas,
    name: `Mandan Das Shrestha - <b>${Madandatas[Madandatas.length - 1]}</b>`,
    votes: Madandatas[Madandatas.length - 1],
  };
  var layout = {
    title: "Vote counts of major mayoral candidates in KTM.",

    uirevision: "true",

    xaxis: { autorange: true },

    yaxis: { autorange: true },

    width: 500,

    height: 800,
  };
  const noOrder = [
    BalendraShah,
    KesabSthapit,
    SrijanaShrestha,
    MandanDasSharestha,
    SumanSayami,
  ];
  const inOrder = noOrder.sort((a, b) => b.votes - a.votes);

  document.getElementById("gd").innerHTML = "";
  document.getElementById("name").innerHTML =
    "<b>Vote counts of major mayoral candidates in KTM.</b>";
  await Plotly.newPlot("gd", inOrder);

  await Plotly.toImage("gd", { format: "jpeg", height: 500, width: 700 }).then(
    (url) => {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      };
      sendImg(options);
    }
  );
};

fillMaps();
