import fetch from 'node-fetch'

export async function downloadJson(url) {
    console.log('Downloading file...')
    const res = await fetch(url)
    return await res.json()
}

export async function downloadText(url) {
    console.log('Downloading file...')
    const res = await fetch(url)
    return await res.text()
}

