const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/Url')

router.get("/", (req, res) => {
    res.render("index", { url: "" });
});

router.post('/', async (req, res) => {
    const longUrl = req.body.longUrl;
    const baseUrl = config.get('baseUrl')

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url) {
                res.render("index", { url: url });
            } else {
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save()
                res.render("index", { url: url })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid long url')
    }
})

module.exports = router