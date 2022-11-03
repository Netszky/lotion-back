module.exports = {
    stripe: {
        key: process.env.STRIPE_PRIVATE_KEY,
        // vue_url: process.env.VUE_APP_URL,
        webhook_secret: process.env.WEBHOOK_SECRET
    }
}