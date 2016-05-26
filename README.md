# Slide-Master
![image](https://cloud.githubusercontent.com/assets/10437615/15277277/2e59959a-1acd-11e6-9473-9778cf2c6c0b.gif)

##Introduction
Slide Master is a web slide player that reads lecture slides from a JSON file. It is mainly composed of a single iframe, the slide viewer onto which content is injected and managed, a notes section that allows notes to be created for each slide, and a display section that displays the added notes. Slide Master has a very friendly user interface and includes features such as specialized notes for each individual slide, auto note saving feature and supports audio for each individual slide.

## Development
Slide Master is primarly a collection of four sections: the slide viewer, the notes section, the display section, and the slide control buttons. The client side was built using bootstrap for great visuals and textillateJS for eye catching animations. The backend was developed with NodeJS, ExpressJS, and a json file store. ExpressJS is used for the web application framework, and the JSON file store is used for data storage. AJAX was used for interaction between the client side and server side. A lecture object is being passed back and forth from the client and server and then saved onto a json file store.

#### Tools Utilized
<ul>
  <a href="https://jquery.com/"><li>JQuery</li></a>
  <a href="https://github.com/ArekSredzki/node-local-object-store"><li>JSON File Store</li></a>
  <a href="http://getbootstrap.com/"><li>Bootstrap</li></a>
  <a href="https://nodejs.org/en/"><li>NodeJS</li></a>
  <a href="http://expressjs.com/"><li>ExpressJS</li></a>
  <a href="http://textillate.js.org/?utm_content=bufferb4552&utm_source=buffer&utm_medium=twitter&utm_campaign=Buffer"><li>TextillateJS</li></a>
  <a href="http://fontawesome.io/icons/?utm_source=www.qipaotu.com"><li>Font Awesome Icons</li></a>
  <a href="https://c9.io"><li>Cloud9</li></a>
</ul>

## Design
The software architecture design pattern used for Slide Master is MVC (Model View Controller). The MVC design pattern allowed the application to become split into three components. The model component directly managed the data, logic, and rules, of slide master. In this application the model component was on the server through the JSON file store where information was stored on a file, updated, and sent to the client. The View component was responsible for the visual representation of the lecture data. Slide master has a View.js file that contains a view object with all the necessary components and methods that manipulate the view. The Controller component accepts input from the user and uses AJAX to send the updated lecture object to the server and receives the updated information and passes it to the view to update the changes made such as the notes is and the controller is contained in controller.js.

## Demo
More information and a live demo can be found <a href="http://slidemaster.hozaifaabdalla.com">here</a>.

## Team 

| <a href="http://hozaifaabdalla.com" target="_blank">**Hozaifa Abdalla**</a> | **Daniel Lopez** | **Alex Kiefer**</a> |
| :---: |:---:| :---:|
| <a href="http://hozaifaabdalla.com" target="_blank"><img src="https://cloud.githubusercontent.com/assets/10437615/14451031/7b62c078-0051-11e6-8f79-1cae306401b7.gif" width="200"></a>    | <img src="https://20160515t000455-dot-slidemaster-1297.appspot.com/img/team/Dan.jpg" width="200"> | <img src="https://20160515t000455-dot-slidemaster-1297.appspot.com/img/team/alex.jpg" height="200">  |
| <a href="http://github.com/abdallahozaifa" target="_blank">`github.com/abdallahozaifa`</a> | <a href="https://github.com/dalofeco" target="_blank">`github.com/dalofeco`</a> | <a href="https://github.com/alkief" target="_blank">`github.com/alkief`</a> |

