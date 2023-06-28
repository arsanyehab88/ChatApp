const GlobalErrorHandling=(err, req, res, next) => {
    res.status(err?.StatusCode).json({message:err?.message})
}

export default GlobalErrorHandling