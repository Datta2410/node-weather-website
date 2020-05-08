

console.log('client side js file is now loaded')
const weatherForm = document.querySelector('form') //returns the first Element within the document that matches the specified selector, or group of selectors. 
                                                    //If no matches are found, null is returned.
                                                    //this function is used to target the html tags in index.html
const search = document.querySelector('input')//targets the first i/p tag in index.hbs
const messageOne = document.querySelector('#message-1')//targets paragraph with id message-1
const messageTwo = document.querySelector('#message-2')//targets paragraph with id message-2

//we should specify a tag id in html so that we can access the specific tag here.
//if we do not give a id to the tag, we will be accessing the first of the given tags
// i.e  if this line "const MessageOne = document.querySelector('p')" was used we will use the first 
//<p> tag in index.hbs rather than the one we want.
//we can also access the html doc using the class of a tag. "const MessageOne = document.querySelector('.className')"

// if(messageOne){ messageOne.textContent = 'From JavaScript'}
weatherForm.addEventListener('submit',(e)=>{//this function is fun when the button is clicked
    e.preventDefault()//prevents the browser from refreshing after the form is submitted
    messageOne.textContent="Loading.."
    
    const location = search.value//gives us the value entered by the user
    

    //fetch function helps fetch a json response from the link given 
    //it helps us fetch data directly to the browser rather than the terminal
    fetch('/weather?address='+ location).then((response)=>{
        //'then' method is used instead of the callback function for request.
            response.json().then((data)=>{
                if(data.error){
                return messageOne.textContent=data.error
            }
                messageTwo.textContent=data.Forecast
                messageOne.textContent=data.location
        })
    }) 
})