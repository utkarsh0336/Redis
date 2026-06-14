import { Worker } from 'bullmq';
import { connection } from './queue.js';


const worker = new Worker(
    'emails',
    async (Job) => {
        console.log("Processing email job ...",Job.id, Job.name, Job.data),
        await new Promise((resolve) => setTimeout(resolve,1500)),
        console.log("Email job completed !", Job.name,Job.id,Job.data)
    },
    { connection }
);

worker.on("completed",(job) => {
    console.log("Job Completed !", job.id,job.name,job.data)
});

worker.on("failed",(job, err) => {
    console.log("Job Failed !", job.id,job.name,job.data,err)
});