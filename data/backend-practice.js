const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response); // log the response 
}); // wait for an event (repsonse to load)

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); // get request to the server
xhr.send(); // send the http request