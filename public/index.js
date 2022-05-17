var Balendatas = [];
var Kesabdatas = [];
var Srijanadatas = [];
var Sumandatas = [];
var Madandatas = [];
var img_jpg = document.getElementById('jpg-export')


const getData = async () => {
    res = await fetch('https://electionupdate.herokuapp.com/api/v1/data').catch(err => console.log(err))
    
    // res = await fetch('http://localhost:3000/api/v1/data')
    console.log(res);
    
    resj = await res.json()
    console.log(resj);
   
    resj.forEach((e, i) => {
        Balendatas.push(e.data[0].votes)
        Kesabdatas.push(e.data[1].votes)
        Srijanadatas.push(e.data[2].votes)
        Madandatas.push(e.data[3].votes)
        Sumandatas.push(e.data[4].votes)
    })
            
}
const sendImg = async (options) => {
    fetch(`/api/v1/postimage`, options).catch(err => {
        console.log(err);
    });
}

const fillMaps = async () => {
    document.getElementById('gd').innerHTML = '<h1> LOADING.... </h1>'
    await getData()

    var BalendraShah = {
        y: Balendatas,
        name: `Balendra shah - <b>${Balendatas[Balendatas.length - 1]}</b>`,
        // text : Balendatas[Balendatas.length - 1]
    }
    var KesabSthapit = {
        y: Kesabdatas,
        name: `Keshab Sthapit - <b>${Kesabdatas[Kesabdatas.length - 1]}</b>`,
        // text : Kesabdatas[Kesabdatas.length - 1]
    }
    var SrijanaShrestha = {
        y: Srijanadatas,
        name: `Srijana Shrestha - <b>${Srijanadatas[Srijanadatas.length - 1]}</b>`,
        // text : Srijanadatas[Srijanadatas.length - 1]
    }
    var SumanSayami = {
        y : Sumandatas,
        name : `Suman Sayami - <b>${Sumandatas[Sumandatas.length - 1]}</b>`
    }
    var MandanDasSharestha ={
        y: Madandatas,
        name : `Mandan Das Shrestha - <b>${Madandatas[Madandatas.length - 1]}</b>`
    }
    var layout = {

        title: 'Vote counts of major mayoral candidates in KTM.',

        uirevision: 'true',

        xaxis: { autorange: true },

        yaxis: { autorange: true },

        width:500,

        height:800

    };

    document.getElementById('gd').innerHTML = ''
    document.getElementById('name').innerHTML = '<b>Vote counts of major mayoral candidates in KTM.</b>'
    await Plotly.newPlot("gd", [BalendraShah, KesabSthapit, SrijanaShrestha, MandanDasSharestha ,SumanSayami])

    await Plotly.toImage("gd", { format: "jpeg", height: 500, width: 700 }).then((url) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ url })
        }
        sendImg(options)
        
        
    })

} 

fillMaps()