"Use strict";
import { Player } from "./entities/player";
import { Client} from "./entities/client";
import { Field } from "./entities/field";
import WebSocket from "ws";




class Game{

    Players: Array<Player>;

    Field: Field | undefined;

    constructor(WebSockets: Array<WebSocket>, Tokens: Array<string>) {


        let Clients: Array<Client> = [
            new Client(WebSockets[0], Tokens[0]),
            new Client(WebSockets[1], Tokens[1])
        ];


        this.Players = [
            new Player(Clients[0], 0),
            new Player(Clients[1], 1)
        ];
        
        Promise.all([
            this.Players[0].initialization,
            this.Players[1].initialization])
            .then(() => {
                this.Field = new Field(this.Players);

            });




    }
}
