var Balendatas = [];
var Kesabdatas =[];
var Srijanadatas =[];

const getData = async () => {
    res = await fetch('https://electionupdate.herokuapp.com/api/v1/data')
    // res = await fetch('http://localhost:3000/api/v1/data')

    resj = await res.json()
   
    resj.forEach((e, i) => {
        Balendatas.push(e.data[0].votes)
        Kesabdatas.push(e.data[1].votes)
        Srijanadatas.push(e.data[2].votes)
    })
            
}
const fillMaps = async () => {
    await getData()

    var BalendraShah = {
        y: Balendatas,
        name: 'Balendra shah'
    }
    var KesabSthapit = {
        y : Kesabdatas,
        name: 'Keshab Sthapit'
    }
    var SrijanaShrestha ={
        y : Srijanadatas,
        name : 'Srijana Shrestha'
    }

    await Plotly.newPlot("gd", [BalendraShah, KesabSthapit, SrijanaShrestha]
    )

}

fillMaps()