const hbs = require('hbs')
const express = require('express')
const path = require('path')
const nodes = require('./untils/geocoding.js')
const app = express()
// define path
const pathView = path.join(__dirname,'template/views')
const pathHbs = path.join(__dirname,'template/partials')
const pathName =path.join(__dirname,'../public')
// set up handlebars and view engine
hbs.registerPartials(pathHbs)
app.use(express.static(pathName))

app.set('view engine','hbs')
app.set('views',pathView)

app.get('',(req,res)=>{
    res.render('index',{
        name:'Weather',
        age:21
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'About',
        age:21
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Help',
        age:21
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Help',
        age:21
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You need to provide the address'
        })
    }
    nodes.geoTude(address,(error,{latitude,longtitude,place}={})=>{
        if(error){
           return res.send({
               error
           })
        }
        nodes.geoWeather(latitude,longtitude,(error,forcastData)=>{
           if(error){
             return res.send({
                 error
             })
           }
           res.send({
               forcast:forcastData,
               location:place,
               address 
           })
        })
     })

})
app.get('*',(req,res)=>{
    res.send('Page is 404')
})

app.listen(3000,()=>{
    console.log("This is server")
})
