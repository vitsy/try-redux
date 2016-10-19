var context = require.context('./server/tests', true, /.*test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
