import {EventEmitter} from 'events';

// Create event emitter object
const eventEmitter = new EventEmitter();

// Register events
eventEmitter.on("hello",()=>console.log("Greetings from events"));
eventEmitter.on("bye",()=>console.log("ByeBye from events"));

//Trigger/Emit events
eventEmitter.emit("bye");