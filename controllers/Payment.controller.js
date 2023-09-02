
const mercadoPago=require("mercado")

const items = [

    {
        id: '1234',
        title: 'Curso de React',
        description: 'Curso de React desde absoluto cero',
        picture_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        quantity: 1,
        currency_id: 'CLP',
        unit_price: 10000
    }

];

const createPayment = async (req,res)=>{
    const {id,title,currency_id,unit_price, quantity}=req.body
    try{mercadoPago.configure({access_token:''}

    )
const preference={
    items,
    back_urls:{
        success:"http://localhost:4000/success-portage",
        pending:"http://localhost:4000/payment/pending-payment",
        failure:"http://localhost:4000/payment/failure-payment"
}}
const respuesta= await mercadoPago.preferences.create(preference)
return res.status(200).json({
    message:'ok',
    detail:respuesta
})}
catch(error){
    res.status(500).json({
        message:'Server error',
        error
    })}
}


const successPayment= async (req,res)=>{

    res.status(500).json({
        message:'OK',
        detail: req.query
    })

}

const pendingPayment= async (req,res)=>{
    
    res.status(500).json({
        message:'OK',
        detail: req.query
    })

}

const failurePayment= async (req,res)=>{
    
    res.status(500).json({
        message:'OK',
        detail: req.query
    })

}


module.exports={createPayment, pendingPayment, failurePending, successPayment}