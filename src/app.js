const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
//console.log(__dirname)
//-------path configs for Express ------------

const app = express()//this is to begin express module
const port = process.env.PORT || 3000//------>this is for heroku
const publicDir = path.join(__dirname,'../public')//directory of all the public files in the project or website
const viewsDir = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')



//--------setup handlebars(hbs) engine and views location-------

app.set('views', viewsDir)//app.set()..here lets us set the custom path of the views folder  
app.set('view engine','hbs')//for the templates handler. used for dynamic websites.
hbs.registerPartials(partialspath)

//helps serve up the public directory to express
app.use(express.static(publicDir))


// res is the response given to the user on the browser
// req obj with the incoming req
// res contains the methods throuh which we can send a response to the user
//to add a new route just add another app.get('{route}')



app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'this is an example Help Message',
        name: 'datta',
        title: 'Help Page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{//res.render('name of the page',object for dynamic info)
                        //res.render() is used to render a particular page
                        // the page must be located in the views dir 
                        //the 1st argument used must match up with the name of the .hbs file that u are trying to render. 
        title: 'About me',
        name: 'datta',
    })
})

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'datta',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'A Location Must Be Provided'
        })
    
    } 
geocode(req.query.address, (error,data)=>{// instead of data object there we can directly obtain the properties i.e the lat and lon and loc frm the geo code by something like this 
    // replace data with {latitude, longitude, location}. in the case where the location is not found the program will thro an error. so i have chose to not use it. 
if (error){
return res.send({
        error
    })
}
const {latitude, longitude, location} = data


forecast(latitude,longitude,(error,forecastData)=>{
if (error){
return res.send('Error:',error)
}
res.send({
    Forecast:forecastData,
    location,
    address:req.query.address
})

})

})
    

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
                error:'you must provide a item to search'
            })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
//quesry string is a way for the browser to request information from the server.
//to make a query string ...http://localhost:3000/products?key=value&search=games&rating=5
//query strings are added at the edn of the url
//they are started with a '?' and have a key,value pair.
//to add more than 1 query string use '&' as shown above in the exmple
app.get('/help/*',(req,res)=>{
    res.render('error',{
        message: 'Help Article not found',
        name: 'datta',
        title:'404'
    })
})
//how express matches requests... will look at the public files
//then it will look at all the app.get functions from top to bottom.
//therefore 404 page must be at last so that express has looked at all the other possibilities
app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page Not found',
        name: 'datta',
        title: '404'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})
