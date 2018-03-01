module.exports = {
    obtainUserStripeId: function( req, res ) {
        const stripeAccountId = null 

        if( !stripeAccountId ) {
            res.status(404).send({
                message:  'No Stripe Account found',
                setUpBegan: false
            })
        } else if( stripeAccountId ) {
            res.status(200).send({
                message: 'Stripe Account',
                setUpBegan: true
            })
        }
    }
}