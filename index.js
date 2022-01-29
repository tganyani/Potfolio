//import express
const express= require('express')
const path = require('path')

const createTransporter = require('./email/sendMail.js')

//import dotenv configuration
require('dotenv').config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'public/index2.html'))
})

app.post('/send_email',async (req,res)=>{
	console.log(req.body)
	res.send(req.body)
	if(!req.body){
			return res.send('Error uploadind file')
		}
		else{
			const recipient = req.body.email;
      		const mailSubject = req.body.name;
      		const mailBody = req.body.message;
      		let mailOptions={
      			from:process.env.SENDER_EMAIL,
      			to:recipient,
      			subject:mailSubject,
      			text:mailBody,
      		}
      		try{
      			let emailTransporter= await createTransporter()

      			emailTransporter.sendMail(mailOptions,function (error,info){
      				if(error){
      					console.log(error)
      				}
      				else{
      					console.log('Email sent:' + info.response)
      					return res.send('successfully sent')
      				}
      			}
      				)
      		}
      		catch(error){
      			return console.log(error)
      		}
		}
})

let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}



app.listen(port,()=>console.log(`The server is listening on port ${port}`))