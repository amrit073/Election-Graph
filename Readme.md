this is a electiongraph which scrapes ekantipur election data for ktm mayor and dicplays a nice graph of it.
I have used mongodb for storing the data and plotyjs for visualization.
To run the program, clone repo and
run  <br> 
``` docker build -t election .
docker run -it -p3000:3000 election
```

applicaiton will load on localhost:3000 <br>

api endpoints:<br>
<b> /api/v1/data <b> : all scraped data in json form <br>
<b> /api/v1/image <b> : image of graph
