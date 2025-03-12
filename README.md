# Node.js
- It is a runtime of JavaScript(JS).
- Runtime: A program that runs another program.
- Runs JS in local machine.
- Build on C++
- Google V8 engine for compiling
- Used for: API, microservices, CLI, server side code

## Architecture
- Single threaded event-driven architecture
- Non-blocking I/O operation

## API
- HTTP methods
- Modules (HTTP, File System, URL, path)
- Callback, promises, async/await
- Server

### HTTP Methods
CRUD operation (Create, Read, Update, Delete)

1. GET (Read)
2. POST (Create)
3. PUT (Update)
4. DELETE (Delete)

## Node.js modules
1. File System
2. Path
3. URL
4. Event
5. HTTP

## Status
1. 200 - range => Success
2. 400 - range => Error by client
3. 500 - range => Error by server

## MongoDB
- Non-relational database
- Collection (Table)
- Document (Row)
- Field (Column)

- Schema (Data structure)
- Model

### MongoDB Tools
- Shell - Terminal
- Compass - Local GUI
- Atlas - Global URL

### MongoDB commands
1. mongosh : Connect with local MongoDB instance
2. show dbs : Show all database
3. cls : Clear screen
4. use <dbname> : Switch to a database Or create new DB if doesn't exist
5. show collections: Show list of collections (table) in a DB

### Query
**Create**
1. insertOne
 - db.<collectionName>.insertOne()
 - For e.g: db.users.insertOne({name:"John"})

2. insertMany
- db.<collectionName>.insertMany()
- For e.g: db.users.insertMany([{name:"Jerry"}, {name:"Tom"}])

**Read**
1. find()
- db.<collectionName>.find()
- For e.g: db.users.find()

2. find(<filterObject>)
- db.users.find({name:"John"})

**Update**
1. updateOne
- db.<collectionName>.updateOne()
- For e.g: db.users.updateOne({name:"Ram"} , {$set: {age: 35}})

**Delete**
1. deleteOne()
- db.<collectionName>.deleteOne()
- For e.g: db.users.deleteOne({name:"Ram"})

**Complex Filter**
1. $gt/$gte
- db.users.find({age: {$gt: 20}})

2. $lt/$lte
- db.users.find({age: {$lte: 20}})

3. $eq/$ne : equal/not equal
