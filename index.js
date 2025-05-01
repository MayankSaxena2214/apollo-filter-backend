import { app } from "./app.js";



const port = process.env.PORT;
const serverUrl = process.env.SERVER;

app.listen(port, () => {
    console.log(`App is listening on ${serverUrl}`);
});
