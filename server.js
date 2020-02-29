const chalk = require("chalk")
const fs = require("fs")

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/actions/:action/:file/:data', function (req, res) {
    if (req.params.action == "save") {
        res.send("Ok")
        console.log(chalk.magenta("[action] Save"))



        const file = req.params.file.replace("-", "/").replace("-", "/").replace("-", "/").replace("-", "/").replace("-", "/")
        const patchArr = file.split("/")
        let patch = ""

        for (var i = 0; i <= patchArr.length - 2; i++) {
            patch += patchArr[i] + "/"
        }

        const mainDir = patchArr[0]

        let string = ""
        let tempString

        if (!fs.existsSync(patch)) {
            console.log("oof")
            for (var i = 0; i <= patchArr.length - 2; i++) {

                for (var x = 0; x <= i; x++) {
                    string += patchArr[x] + "/"

                    if (!fs.existsSync(string)) {
                        fs.mkdirSync(string)
                    }
                }
                string = ""
            }

        }
        fs.writeFile(file, req.params.data, function (err) {
            if (err) console.log(chalk.red(`[error] ${err}`))
        })

    } else if (req.params.action == "read") {
        console.log(req.params.file)
        console.log(chalk.magenta("[action] Read"))

        const file = req.params.file.replace("-", "/").replace("-", "/").replace("-", "/").replace("-", "/").replace("-", "/")

        if (!fs.existsSync(file)) {
            return res.json({
                data: "this file doesn't exist"
            })
        } else {
            const data = require("./" + file)
            res.json({
                data: data
            })
        }
    }
})

app.listen(80, function () {
    console.log(chalk.blue("[server] Wystartowano serwer na porcie 80"))
});