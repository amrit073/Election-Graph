var Balendatas = [];
var Kesabdatas =[];
var Srijanadatas =[];

const getData = async () => {
    res = await fetch('https://electionupdate.herokuapp.com/api/v1/data').catch(err=>console.log(err))
    
    // res = await fetch('http://localhost:3000/api/v1/data')
    console.log(res);
    
    resj = await res.json()
   console.log(resj);
   
    resj.forEach((e, i) => {
        Balendatas.push(e.data[0].votes)
        Kesabdatas.push(e.data[1].votes)
        Srijanadatas.push(e.data[2].votes)
    })
            
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
        y : Kesabdatas,
        name: `Keshab Sthapit - <b>${Kesabdatas[Kesabdatas.length - 1]}</b>`,
        // text : Kesabdatas[Kesabdatas.length - 1]
    }
    var SrijanaShrestha ={
        y : Srijanadatas,
        name : `Srijana Shrestha - <b>${Srijanadatas[Srijanadatas.length - 1]}</b>`,
        // text : Srijanadatas[Srijanadatas.length - 1]
    }
     document.getElementById('gd').innerHTML = ''
    await Plotly.newPlot("gd", [BalendraShah, KesabSthapit, SrijanaShrestha]
    )

}

fillMaps()