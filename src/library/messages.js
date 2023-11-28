exports.success = (req, res, data = [], status = 200) => {
    res.stauts(status).send({
        error: false,
        status: status,
        data: data
})
}

exports.error = (req, res, message  = "Internal error", status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        data: message
    })
}
