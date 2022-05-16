import express from 'express'
import cheerio from 'cheerio'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'
import cors from 'cors'
const app = express()
import fetch from 'node-fetch'


const Schema = mongoose.Schema

const dataSchema = new Schema({
	data: Object
}, { timestamps: true })


const myData = mongoose.model('myData', dataSchema)

mongoose.connect(process.env.mongoURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, (err) => {
	if (err) return err
	app.listen( (process.env.PORT || 3000), () => {
		console.log('started listenig at port ');
	})
})
app.use(cors(
{
	origin: '*',
optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
))
app.use(express.static('./public'))

app.get('/api/v1/data', async (req, res) => {
	const source = await fetch('https://election.ekantipur.com/pradesh-3/district-kathmandu/kathmandu?lng=eng')
	const sourcetext = await source.text()
		.catch(err => console.log(err))
	const $ = cheerio.load(sourcetext)
	const names = []
	const arrv = []
	const num = $('.list-group-flush .candidate-name')
	const vote = $('.list-group-flush .vote-numbers')

	$(num).each((i, el) => {
		names.push(el.children[0].data)
	})
	$(vote).each((i, el) => {
		arrv.push(el)
	})

	// const to_send = []
	const mayor = []
	for (var i = 0; i < 5; i++) {
		mayor.push({
			name: names[i],
			votes: arrv[i].children[0].data
		})
	}

	myData.find({}).exec((err, data) => {
		// console.log(data[data.length - 1].data[0].votes==mayor[0].votes)
		// console.log(mayor[0].votes);
		if (err) throw err
		if (data[data.length - 1].data[0].votes !== mayor[0].votes) {
			console.log('data is not same , uploading');
			
			myData.create({ data: mayor }, (err, data) => {
				if (err) throw err;
				console.log(data);
		
			})
		}
		console.log(data);
		
		res.send(data)

	})
	
		
})

