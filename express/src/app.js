/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

const cors = require("cors");

// Middleware
app.use(cors());

// 
const dice = require('./routes/dice');
app.use('/api/dice', dice);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));