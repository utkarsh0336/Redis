import express from "express";
import { emailQueue } from "./queue.js";
import { Backoffs } from "bullmq";


const app = express();

app.use(express.json())

app.post("/welcome-email", async(req,res) => {
   const job = emailQueue.add(
    "send-welcome-email",
    {
        to: req.body.to,
        name: req.body.name || "Learner"
    },
    {
        attempts: 3,
        backoffs: {
            type: 'exponential',
            delay: 1000
        }
    }
   );
   res.json({message: "Welcome email job added to the queue", jobId: job.id});
})



app.listen(3000,() => {
    console.log("Server is listening on port 3000");
})