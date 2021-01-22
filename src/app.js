const path = require('path')
const express = require('express')
const hbs = require('hbs') //to import partials feature
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT || 3000

//Define path for express config
const publicFileDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname ,'../templates/views' )
const partialsPath = path.join(__dirname ,'../templates/partials')

//Setup handlebar engines and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicFileDirPath))

app.get('',(req,res) =>{
    res.render('index', {
        title:'Weather',
        name :'Yokesh'
    })
})

app.get('/about' , (req , res)=>{
  res.render('about' ,  {
      title : 'About Page',
      name : 'Yokesh'
  })
})

app.get('/help' , (req ,res)=>{
    res.render('help', {
        title:'Help Page',
        name : 'Yokesh',
        message :'We are there to help'
    })
})


app.get('/weather' , (req,res)=>{

    if(!req.query.address){
         return res.send({
            error :'please give a valid address'
        })
    }

geocode(req.query.address , (error ,{latitude , longitude , location})=>{
    if(error){
       return res.send(error)
    }
    forecast(latitude , longitude ,(error , forecastData)=>{
        if(error){
        return  res.send(error)
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
        
    })
})

   
    
})

app.get('/help/*' , (req,res)=>{
    res.render('404',{
        title:'Help',
        message:'Help article not found',
        name : 'Yokesh'
    })
})

app.get('*' , (req,res)=>{
    res.render('404',{
        pagetitle:'404 Error',
        message:'Page Not Found',
        name :'Yokesh'
    })
})

app.listen(port, ()=>{
    console.log('Server started!')
})