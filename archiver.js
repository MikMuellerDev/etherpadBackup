import fs from 'fs'

function getTimeStamp() {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear();
    const hh = today.getHours()
    const mmm = today.getMinutes()
    const ss = today.getSeconds()
    return `${yyyy}-${mm}-${dd}-${hh}:${mmm}:${ss}`
    // year month day - hour minute second
}

async function createFolder(name) {
    fs.mkdirSync(name, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Created: ${name}`);
    });
}

async function writeFile(content, file) {
    fs.writeFileSync(file, content, function (err) {
        if (err) return console.log(err);
        console.log(`Written to file: ${file}`);
    })
}

export async function archive(content, filename) {
    const dateStamp = getTimeStamp()
    await createFolder(`./archive/${dateStamp}-${filename}`)
    await writeFile(content, `./archive/${dateStamp}-${filename}/${filename}`)
}