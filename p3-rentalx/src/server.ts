import { app } from "app";
import { createConnection } from "database";

app.listen(3333, () => {
    console.log("server running");
});

createConnection()
    .then(() => {
        console.log("data source started");
    })
    .catch((err) => {
        console.log(err);
    });
