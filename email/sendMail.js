const nodemailer = require('nodemailer')


//Googleapis
 const {google}=require('googleapis')
 const OAuth2 = google.auth.OAuth2
 const createTransporter=async()=>{
	  	const oauth2Client = new OAuth2(
	  		process.env.CLIENT_ID,
	  		process.env.CLIENT_SECRET,
	  		"https://developers.google.com/oauthplayground"
	  		)
	  	oauth2Client.setCredentials({
	  		refresh_token:process.env.REFRESH_TOKEN,
	  	})
	  	const accessToken = await new Promise((resolve,reject)=>{
	  		oauth2Client.getAccessToken((err,token)=>{
	  			if(err){
	  				reject('Failed to create access token')
	  			}
	  			resolve(token)
	  		})
	  	})
	  	 const transporter = nodemailer.createTransport({
      	service:'gmail',
      	auth:{
      		type:'OAuth2',
      		user:'tatendaganyani5@gmail.com',
      		accessToken,
      		clientTd:process.env.CLIENT_ID,
      		clientSecret:process.env.CLIENT_SECRET,
      		refreshToken:process.env.REFRESH_TOKEN,
      	},
      })
	  	 return transporter
	  }

	  module.exports = createTransporter