/**
 * @fileoverview Model class of a die
 * @author Póvoa Tiago
 */

const Chance = require("chance");
const chance = Chance();

module.exports = class Die {
    constructor() {
        this.value = chance.rpg('1d20');
        this.owner = "anon";
    }

    roll() {
        this.value = chance.rpg('1d20'); 
    }
    
    setOwner(owner) {
        this.owner = owner;
    }
}