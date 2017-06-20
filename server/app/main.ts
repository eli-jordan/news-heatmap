import {Login} from "./login";
import express = require('express');
import request = require('superagent');

let login = new Login({
    url: "https://my.digitalexperience.ibm.com",
    tenantId: "79820b61-77ab-48c4-a8c2-b231046a2b27",
    username: "vaucluse@isc4sb.com",
    password: "hackathon2017"
});

function main() {
    const app = express();
    app.set('port', process.env.PORT || 4750);

    app.route("/api/related-to/:id").get((req, res) => {
        const stage = req.query.stage || "delivery";

        res.send("not implemented");
    });

    app.route("/api/list-articles").get((req, res) => {
        const stage = req.query.stage || "delivery";

        res.send("not implemented");
    });

    // Start the server
    app.listen(app.get('port'), () => {
        console.log("Express server listening on port " + app.get('port'));
    });
    
    return app;
}

main();
