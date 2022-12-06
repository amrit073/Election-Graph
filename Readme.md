this is a electiongraph which scrapes ekantipur election data for ktm mayor and dicplays a nice graph of it.
I have used mongodb for storing the data and plotyjs for visualization.
To run the program, clone repo and
run 
<code> docker build -t election .
docker run -it -p3000:3000 election
</code>

applicaiton will load on localhost:3000
