# cric api

### Features

- Gets player bio stats
- Data sync to mongo DB
- Gets player series stats which include

		- ipl
		- t20
		- odi
		- tests
		- bio 
	
#### version v1.0.0:  
		- Integrated player API
		- get all the the ID's
		- get all the player name and ID
		- get bio stats based on the ID
		- get ID based on regex player name
		- get tests stats for player
		- get ODI stats for player
		- get t20 stats for player
		- get IPL stats for play

#### version v2.0.0:
		- Integrated Dockerfile
		- Containerized APP

#### version v2.0.1:
		- Improvised Docker
		- Cloud integration
		- Enhanced API header parameters

##### API:
	/get-all-player-name-and-id GET
	/get-all-player-id GET
	/get-player-bio POST body-param:{'id': 1234}
	/get-player-id POST body-param:{'id': 1234}
	/get-player-tests-stats POST body-param:{'id': 1234}
	/get-player-odi-stats POST body-param:{'id': 1234}
	/get-player-t20-stats POST body-param:{'id': 1234}
	/get-player-ipl-stats POST body-param:{'id': 1234}

##### Note:  Most of post API works with player unique id eg: {'id': 1234}, player unique id is the identifier that has been mapped to respective dataset in DB. So you should first get the ID for each player and those can be found via the below API call.
	/get-all-player-name-and-id	GET

##### NOTE: Docker private port/container port will be 8080
