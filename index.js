import {downloadJson, downloadText} from "./downloader.js";
import {archive} from './archiver.js'
import fs from 'fs'
import nodeCron from "node-cron";

async function runJob(job) {
    let fileContent
    console.log(`--- ${job.filename} ---`)
    const url = job['url']
    if (job['type'] === 'JSON') {
        fileContent = JSON.stringify(await downloadJson(url))
    } else if (job['type'] === 'TEXT') {
        fileContent = await downloadText(url)
    } else {
        throw new Error(`Content type: ${job['type']} does not exist`)
    }
    await archive(fileContent, job['filename'])
}

async function readFile(filename) {
    const fileContent = fs.readFileSync(filename, 'utf8')
    return JSON.parse(fileContent)
}

async function main() {
    const jobs = (await readFile('./config.json'))['jobs']
    for (let job of jobs) {
        await runJob(job)
    }

    nodeCron.schedule(
        `0 3 * * *`,
        async function () {
            for (let job of jobs) {
                await runJob(job)
            }
        }, {timezone: "Europe/Berlin"}
    )
}

main().then(function () {
})